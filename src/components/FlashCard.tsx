'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface FlashCardProps {
  codon: string;
  answer: string;
  hint?: string;
}

// Multi-color gradient themes (same as PresetCard)
const CARD_COLORS = [
  'from-pink-400 via-purple-500 to-indigo-500',
  'from-orange-400 via-rose-500 to-violet-500',
  'from-teal-400 via-cyan-500 to-blue-500',
  'from-violet-500 via-fuchsia-400 to-orange-400',
  'from-sky-400 via-indigo-500 to-purple-500',
  'from-amber-400 via-rose-400 to-pink-500',
  'from-emerald-400 via-teal-500 to-cyan-500',
  'from-rose-400 via-purple-500 to-indigo-500',
  'from-lime-400 via-teal-500 to-blue-500',
  'from-blue-400 via-violet-500 to-pink-500',
];

export default function FlashCard({ codon, answer, hint }: FlashCardProps) {
  const { t, displayMode } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get color based on answer hash
  const getColorIndex = () => {
    let hash = 0;
    for (let i = 0; i < answer.length; i++) {
      hash = answer.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % CARD_COLORS.length;
  };

  const cardGradient = CARD_COLORS[getColorIndex()];

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

  // Dynamic font size based on answer length
  const getAnswerFontSize = () => {
    const len = answer.length;
    if (len <= 15) return 'text-2xl md:text-3xl';
    if (len <= 25) return 'text-xl md:text-2xl';
    if (len <= 40) return 'text-lg md:text-xl';
    return 'text-base md:text-lg';
  };

  const answerFontSize = getAnswerFontSize();
  const needsScroll = answer.length > 60;

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
          className={`absolute inset-0 rounded-xl p-5 flex flex-col justify-between shadow-xl shadow-black/20 bg-gradient-to-br ${cardGradient}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {showAnswerFirst ? (
            // Answer on front
            <>
              <div className="text-white/70 text-sm">{t('answer')}</div>
              <div className={`text-center flex-1 flex flex-col justify-center ${needsScroll ? 'overflow-y-auto' : ''}`}>
                <div className={`text-white ${answerFontSize} font-bold tracking-wider drop-shadow-sm px-1`}>
                  {answer}
                </div>
                {hint && (
                  <div className="text-white/70 text-sm mt-2">
                    {hint}
                  </div>
                )}
              </div>
              <div className="text-white/50 text-xs">{t('clickToFlip')}</div>
            </>
          ) : (
            // Codon on front
            <>
              <div className="text-white/70 text-sm">{t('codon')}</div>
              <div className="text-center">
                <div className="font-mono text-base md:text-lg text-white leading-relaxed break-all drop-shadow-sm">
                  {formatCodon(codon)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/50 text-xs">{t('clickToFlip')}</div>
                <button
                  onClick={handleCopy}
                  className="text-white/60 hover:text-white text-sm px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copied ? t('copied') : t('copy')}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 rounded-xl p-5 flex flex-col justify-between shadow-xl shadow-black/20 bg-gradient-to-br ${cardGradient}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {showAnswerFirst ? (
            // Codon on back
            <>
              <div className="text-white/70 text-sm">{t('codon')}</div>
              <div className="text-center">
                <div className="font-mono text-base md:text-lg text-white leading-relaxed break-all drop-shadow-sm">
                  {formatCodon(codon)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-white/50 text-xs">{t('clickBack')}</div>
                <button
                  onClick={handleCopy}
                  className="text-white/60 hover:text-white text-sm px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copied ? t('copied') : t('copy')}
                </button>
              </div>
            </>
          ) : (
            // Answer on back
            <>
              <div className="text-white/70 text-sm">{t('answer')}</div>
              <div className={`text-center flex-1 flex flex-col justify-center ${needsScroll ? 'overflow-y-auto' : ''}`}>
                <div className={`text-white ${answerFontSize} font-bold tracking-wider drop-shadow-sm px-1`}>
                  {answer}
                </div>
                {hint && (
                  <div className="text-white/70 text-sm mt-2">
                    {hint}
                  </div>
                )}
              </div>
              <div className="text-white/50 text-xs text-center">{t('clickBack')}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
