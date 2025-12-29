'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface FlashCardProps {
  codon: string;
  answer: string;
  hint?: string;
}

export default function FlashCard({ codon, answer, hint }: FlashCardProps) {
  const { t, displayMode } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(codon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format codon with spaces every 3 characters for readability
  const formatCodon = (c: string) => {
    return c.match(/.{1,3}/g)?.join(' ') || c;
  };

  const showAnswerFirst = displayMode === 'answer';

  return (
    <div
      className="perspective-1000 cursor-pointer w-full max-w-md mx-auto"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-56 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 rounded-xl p-5 flex flex-col justify-between shadow-md ${
            showAnswerFirst
              ? 'bg-neutral-800 dark:bg-neutral-200'
              : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {showAnswerFirst ? (
            // Answer on front
            <>
              <div className="text-neutral-400 dark:text-neutral-500 text-sm">{t('answer')}</div>
              <div className="text-center">
                <div className="text-white dark:text-neutral-900 text-2xl md:text-3xl font-bold tracking-wider">
                  {answer}
                </div>
                {hint && (
                  <div className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">
                    {hint}
                  </div>
                )}
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 text-xs">{t('clickToFlip')}</div>
            </>
          ) : (
            // Codon on front
            <>
              <div className="text-teal-700 dark:text-teal-400 text-sm">{t('codon')}</div>
              <div className="text-center">
                <div className="font-mono text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed break-all">
                  {formatCodon(codon)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-neutral-400 dark:text-neutral-500 text-xs">{t('clickToFlip')}</div>
                <button
                  onClick={handleCopy}
                  className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 text-sm px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  {copied ? t('copied') : t('copy')}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 rounded-xl p-5 flex flex-col justify-between shadow-md ${
            showAnswerFirst
              ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
              : 'bg-neutral-800 dark:bg-neutral-200'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {showAnswerFirst ? (
            // Codon on back
            <>
              <div className="text-teal-700 dark:text-teal-400 text-sm">{t('codon')}</div>
              <div className="text-center">
                <div className="font-mono text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed break-all">
                  {formatCodon(codon)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-neutral-400 dark:text-neutral-500 text-xs">{t('clickBack')}</div>
                <button
                  onClick={handleCopy}
                  className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 text-sm px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  {copied ? t('copied') : t('copy')}
                </button>
              </div>
            </>
          ) : (
            // Answer on back
            <>
              <div className="text-neutral-400 dark:text-neutral-500 text-sm">{t('answer')}</div>
              <div className="text-center">
                <div className="text-white dark:text-neutral-900 text-2xl md:text-3xl font-bold tracking-wider">
                  {answer}
                </div>
                {hint && (
                  <div className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">
                    {hint}
                  </div>
                )}
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 text-xs text-center">{t('clickBack')}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
