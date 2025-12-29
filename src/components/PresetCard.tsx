'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface PresetCardProps {
  text: string;
  codon: string;
  hintEn?: string;
  hintZh?: string;
  colorIndex?: number;
}

// Multi-color gradient themes (balanced for white text readability)
const CARD_COLORS = [
  // Pink → Purple → Indigo
  'from-pink-400 via-purple-500 to-indigo-500',
  // Coral → Rose → Violet
  'from-orange-400 via-rose-500 to-violet-500',
  // Teal → Cyan → Blue
  'from-teal-400 via-cyan-500 to-blue-500',
  // Violet → Fuchsia → Orange
  'from-violet-500 via-fuchsia-400 to-orange-400',
  // Sky → Indigo → Purple
  'from-sky-400 via-indigo-500 to-purple-500',
  // Amber → Rose → Pink
  'from-amber-400 via-rose-400 to-pink-500',
  // Emerald → Teal → Cyan
  'from-emerald-400 via-teal-500 to-cyan-500',
  // Rose → Purple → Indigo
  'from-rose-400 via-purple-500 to-indigo-500',
  // Lime → Teal → Blue
  'from-lime-400 via-teal-500 to-blue-500',
  // Blue → Violet → Pink
  'from-blue-400 via-violet-500 to-pink-500',
];

export default function PresetCard({ text, codon, hintEn, hintZh, colorIndex = 0 }: PresetCardProps) {
  const { t, locale, displayMode } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [copiedCodon, setCopiedCodon] = useState(false);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  const hint = locale === 'zh' ? hintZh : hintEn;

  // Get color based on text hash for consistent colors
  const getColorIndex = () => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % CARD_COLORS.length;
  };

  const cardGradient = CARD_COLORS[getColorIndex()];

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleCopyCodon = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(codon);
    setCopiedCodon(true);
    setTimeout(() => setCopiedCodon(false), 2000);
  };

  const handleCopyAnswer = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  // Format codon for display (shorter version)
  const shortCodon = codon.length > 36 ? codon.slice(0, 36) + '...' : codon;

  // Determine what shows on front based on displayMode
  const showAnswerFirst = displayMode === 'answer';

  return (
    <div
      className="cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className="relative aspect-[3/4] transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between transition-all ${
            showAnswerFirst
              ? `bg-gradient-to-br ${cardGradient} shadow-xl shadow-black/20`
              : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 shadow-lg shadow-slate-300/50 dark:shadow-black/30 border border-slate-200/80 dark:border-slate-700/50'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {showAnswerFirst ? (
            // Answer on front (colorful)
            <>
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{t('answer')}</span>
                <button
                  onClick={handleCopyAnswer}
                  className="text-white/60 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copiedAnswer ? t('copied') : t('copy')}
                </button>
              </div>
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-white text-xl font-bold tracking-wide leading-tight drop-shadow-sm">
                  {text}
                </div>
                {hint && (
                  <div className="text-white/70 text-sm mt-2">{hint}</div>
                )}
              </div>
              <div className="text-white/50 text-xs text-center">{t('clickToFlip')}</div>
            </>
          ) : (
            // Codon on front (neutral)
            <>
              <div className="flex justify-between items-start">
                <span className="text-teal-600 dark:text-teal-400 text-xs font-medium uppercase tracking-wider">{t('codon')}</span>
                <button
                  onClick={handleCopyCodon}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {copiedCodon ? t('copied') : t('copy')}
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="font-mono text-sm text-slate-700 dark:text-slate-300 break-all leading-relaxed text-center">
                  {shortCodon}
                </div>
              </div>
              <div className="text-slate-400 dark:text-slate-500 text-xs text-center">{t('clickToFlip')}</div>
            </>
          )}
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between transition-all ${
            showAnswerFirst
              ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 shadow-lg shadow-slate-300/50 dark:shadow-black/30 border border-slate-200/80 dark:border-slate-700/50'
              : `bg-gradient-to-br ${cardGradient} shadow-xl shadow-black/20`
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {showAnswerFirst ? (
            // Codon on back (neutral)
            <>
              <div className="flex justify-between items-start">
                <span className="text-teal-600 dark:text-teal-400 text-xs font-medium uppercase tracking-wider">{t('codon')}</span>
                <button
                  onClick={handleCopyCodon}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {copiedCodon ? t('copied') : t('copy')}
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="font-mono text-sm text-slate-700 dark:text-slate-300 break-all leading-relaxed text-center">
                  {shortCodon}
                </div>
              </div>
              <div className="text-slate-400 dark:text-slate-500 text-xs text-center">{t('clickBack')}</div>
            </>
          ) : (
            // Answer on back (colorful)
            <>
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{t('answer')}</span>
                <button
                  onClick={handleCopyAnswer}
                  className="text-white/60 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copiedAnswer ? t('copied') : t('copy')}
                </button>
              </div>
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-white text-xl font-bold tracking-wide leading-tight drop-shadow-sm">
                  {text}
                </div>
                {hint && (
                  <div className="text-white/70 text-sm mt-2">{hint}</div>
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
