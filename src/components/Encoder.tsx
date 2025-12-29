'use client';

import { useState, useEffect } from 'react';
import { textToCodon, codonToText, INVALID_LETTERS } from '@/lib/codon';
import { useApp } from '@/context/AppContext';
import { saveCard, cardExists } from '@/lib/savedCards';
import FlashCard from './FlashCard';

interface EncoderProps {
  onCardSaved?: () => void;
}

export default function Encoder({ onCardSaved }: EncoderProps) {
  const { t } = useApp();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{
    codon: string;
    valid: boolean;
    invalidChars: string[];
  } | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [showCard, setShowCard] = useState(false);
  const [saved, setSaved] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [keepSpaces, setKeepSpaces] = useState(true);

  useEffect(() => {
    if (!input.trim()) {
      setResult(null);
      setShowCard(false);
      setSaved(false);
      setAlreadyExists(false);
      return;
    }

    if (mode === 'encode') {
      const encoded = textToCodon(input);
      setResult(encoded);
      // Check if card already exists (check both with and without spaces)
      const textWithSpaces = input.toUpperCase().replace(/[^A-Z ]/g, '').replace(/\s+/g, ' ').trim();
      const textWithoutSpaces = input.toUpperCase().replace(/[^A-Z]/g, '');
      setAlreadyExists(cardExists(textWithSpaces) || cardExists(textWithoutSpaces));
    } else {
      const decoded = codonToText(input);
      setResult({
        codon: decoded,
        valid: !decoded.includes('?'),
        invalidChars: [],
      });
    }
    setSaved(false);
  }, [input, mode]);

  const handleGenerate = () => {
    if (result && result.codon) {
      setShowCard(true);
    }
  };

  const handleSaveCard = () => {
    if (result && result.codon && mode === 'encode') {
      const cleanText = keepSpaces
        ? input.toUpperCase().replace(/[^A-Z ]/g, '').replace(/\s+/g, ' ').trim()
        : input.toUpperCase().replace(/[^A-Z]/g, '');
      saveCard(cleanText, result.codon);
      setSaved(true);
      setAlreadyExists(true);
      onCardSaved?.();
    }
  };

  const copyToClipboard = async () => {
    if (result?.codon) {
      await navigator.clipboard.writeText(mode === 'encode' ? result.codon : result.codon);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-neutral-200/60 dark:bg-neutral-800/60 rounded-lg p-1 inline-flex">
          <button
            onClick={() => { setMode('encode'); setInput(''); setShowCard(false); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            {t('encodeMode')}
          </button>
          <button
            onClick={() => { setMode('decode'); setInput(''); setShowCard(false); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            {t('decodeMode')}
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowCard(false); }}
          placeholder={mode === 'encode' ? t('encodePlaceholder') : t('decodePlaceholder')}
          className="w-full h-28 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-500 font-mono text-sm resize-none"
        />
        {mode === 'encode' && (
          <div className="absolute bottom-2 right-2 text-xs text-neutral-400 dark:text-neutral-500">
            {t('invalidLetters')}: {INVALID_LETTERS.join(', ')}
          </div>
        )}
      </div>

      {/* Validation Warning */}
      {result && !result.valid && mode === 'encode' && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-3 text-amber-700 dark:text-amber-300 text-sm">
          <span className="font-medium">{t('invalidWarning')}:</span> {result.invalidChars.join(', ')}
          <br />
          <span className="text-amber-600/80 dark:text-amber-400/70 text-xs">{t('invalidHint')}</span>
        </div>
      )}

      {/* Result Preview */}
      {result && result.codon && (
        <div className="bg-neutral-100 dark:bg-neutral-800/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              {mode === 'encode' ? t('generatedCodon') : t('decodeResult')}
            </span>
            <button
              onClick={copyToClipboard}
              className="text-teal-700 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 text-sm"
            >
              {t('copy')}
            </button>
          </div>
          <div className="font-mono text-teal-700 dark:text-teal-400 break-all text-sm leading-relaxed">
            {mode === 'encode'
              ? result.codon.match(/.{1,3}/g)?.join(' ')
              : result.codon
            }
          </div>
          {mode === 'encode' && (
            <div className="text-neutral-400 dark:text-neutral-500 text-xs">
              {result.codon.length} {t('baseCount')} {result.codon.length / 3} {t('aminoAcids')}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {result && result.codon && mode === 'encode' && (
        <div className="space-y-3">
          {/* Keep Spaces Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keepSpaces}
              onChange={(e) => setKeepSpaces(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 bg-white dark:bg-neutral-800"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('keepSpaces')}</span>
          </label>

          <div className="flex gap-3">
            {/* Generate Card Button */}
            {!showCard && (
              <button
                onClick={handleGenerate}
                className="flex-1 py-2.5 bg-neutral-800 dark:bg-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 font-medium rounded-lg transition-colors text-sm"
              >
                {t('generateCard')}
              </button>
            )}

            {/* Save Card Button */}
            <button
              onClick={handleSaveCard}
              disabled={saved || alreadyExists}
              className={`flex-1 py-2.5 font-medium rounded-lg transition-colors text-sm ${
                saved
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 cursor-default'
                  : alreadyExists
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {saved ? t('cardSaved') : alreadyExists ? t('cardSaved') : t('saveCard')}
            </button>
          </div>
        </div>
      )}

      {/* Flash Card */}
      {showCard && result && mode === 'encode' && (
        <div className="pt-3">
          <FlashCard
            codon={result.codon}
            answer={input.toUpperCase().replace(/[^A-Z]/g, '')}
          />
        </div>
      )}
    </div>
  );
}
