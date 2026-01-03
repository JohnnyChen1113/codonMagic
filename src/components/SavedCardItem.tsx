'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SavedCard, deleteCard } from '@/lib/savedCards';

interface SavedCardItemProps {
  card: SavedCard;
  onDelete: () => void;
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

export default function SavedCardItem({ card, onDelete }: SavedCardItemProps) {
  const { t, displayMode } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Get color based on text hash
  const getColorIndex = () => {
    let hash = 0;
    for (let i = 0; i < card.text.length; i++) {
      hash = card.text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % CARD_COLORS.length;
  };

  const cardGradient = CARD_COLORS[getColorIndex()];

  const handleClick = () => {
    if (!showConfirm) {
      setFlipped(!flipped);
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(card.codon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCard(card.id);
    onDelete();
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const shortCodon = card.codon.length > 36 ? card.codon.slice(0, 36) + '...' : card.codon;
  const showAnswerFirst = displayMode === 'answer';

  // Dynamic font size based on text length
  const getAnswerFontSize = () => {
    const len = card.text.length;
    if (len <= 15) return 'text-xl';
    if (len <= 25) return 'text-lg';
    if (len <= 40) return 'text-base';
    return 'text-sm';
  };

  const answerFontSize = getAnswerFontSize();
  const needsScroll = card.text.length > 60;

  return (
    <div className="cursor-pointer group relative" onClick={handleClick}>
      {/* Delete Confirmation Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-10 bg-black/60 rounded-2xl flex flex-col items-center justify-center gap-3 p-4">
          <p className="text-white text-sm text-center">{t('confirmDelete')}</p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
            >
              {t('deleteCard')}
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-4 py-1.5 bg-neutral-600 hover:bg-neutral-500 text-white text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        className="relative aspect-[3/4] transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between transition-all bg-gradient-to-br ${cardGradient} shadow-xl shadow-black/20`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {showAnswerFirst ? (
            <>
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{t('answer')}</span>
                <button
                  onClick={handleDeleteClick}
                  className="text-white/50 hover:text-white/80 text-xs transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className={`text-center flex-1 flex flex-col justify-center ${needsScroll ? 'overflow-y-auto' : ''}`}>
                <div className={`text-white ${answerFontSize} font-bold tracking-wide leading-tight drop-shadow-sm px-1`}>
                  {card.text}
                </div>
              </div>
              <div className="text-white/50 text-xs text-center">{t('clickToFlip')}</div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{t('codon')}</span>
                <div className="flex gap-1">
                  <button
                    onClick={handleCopy}
                    className="text-white/60 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied ? t('copied') : t('copy')}
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="text-white/50 hover:text-white/80 text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="font-mono text-sm text-white break-all leading-relaxed text-center drop-shadow-sm">
                  {shortCodon}
                </div>
              </div>
              <div className="text-white/50 text-xs text-center">{t('clickToFlip')}</div>
            </>
          )}
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between transition-all bg-gradient-to-br ${cardGradient} shadow-xl shadow-black/20`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {showAnswerFirst ? (
            <>
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{t('codon')}</span>
                <button
                  onClick={handleCopy}
                  className="text-white/60 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copied ? t('copied') : t('copy')}
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="font-mono text-sm text-white break-all leading-relaxed text-center drop-shadow-sm">
                  {shortCodon}
                </div>
              </div>
              <div className="text-white/50 text-xs text-center">{t('clickBack')}</div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{t('answer')}</span>
                <button
                  onClick={handleDeleteClick}
                  className="text-white/50 hover:text-white/80 text-xs transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className={`text-center flex-1 flex flex-col justify-center ${needsScroll ? 'overflow-y-auto' : ''}`}>
                <div className={`text-white ${answerFontSize} font-bold tracking-wide leading-tight drop-shadow-sm px-1`}>
                  {card.text}
                </div>
              </div>
              <div className="text-white/50 text-xs text-center">{t('clickBack')}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
