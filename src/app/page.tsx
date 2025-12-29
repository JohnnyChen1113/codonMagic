'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import Encoder from '@/components/Encoder';
import PresetCard from '@/components/PresetCard';
import SavedCardItem from '@/components/SavedCardItem';
import { getAllPresetsWithCodons, getCategoryKeys } from '@/lib/presets';
import { getSavedCards, SavedCard } from '@/lib/savedCards';

const UNSUPPORTED_LETTERS = ['B', 'J', 'O', 'U', 'X', 'Z'];

export default function Home() {
  const { t, locale, setLocale, theme, toggleTheme, displayMode, toggleDisplayMode, mounted } = useApp();
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'myCards'>('presets');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  const presets = useMemo(() => getAllPresetsWithCodons(), []);
  const categoryKeys = useMemo(() => getCategoryKeys(), []);

  const filteredPresets = selectedCategory
    ? presets.filter(p => p.category === selectedCategory)
    : presets;

  // Load saved cards
  const loadSavedCards = useCallback(() => {
    setSavedCards(getSavedCards());
  }, []);

  useEffect(() => {
    if (mounted) {
      loadSavedCards();
    }
  }, [mounted, loadSavedCards]);

  // Prevent hydration mismatch by not rendering interactive content until mounted
  if (!mounted) {
    return (
      <main className="min-h-screen bg-neutral-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-neutral-500 text-sm">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-950 transition-colors">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm sticky top-0 z-10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧬</span>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{t('title')}</h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('subtitle')}</p>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Display Mode Toggle */}
              <button
                onClick={toggleDisplayMode}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
              >
                {displayMode === 'answer' ? t('showAnswer') : t('showCodon')}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="px-2.5 py-1.5 rounded-md text-xs transition-colors bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
              >
                {locale === 'en' ? '中文' : 'EN'}
              </button>
            </div>
          </div>

          {/* Tagline - hidden on mobile */}
          <p className="text-xs text-neutral-500 hidden sm:block mt-2">
            {t('tagline')}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Unsupported Letters Notice */}
        <div className="mb-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <div>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <span className="font-medium">{t('unsupportedLetters')}:</span>
                <span className="font-mono font-bold ml-2 tracking-wider text-amber-900 dark:text-amber-100">
                  {UNSUPPORTED_LETTERS.join('  ')}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center mb-6">
          <div className="bg-neutral-200/60 dark:bg-neutral-800/60 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'presets'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {t('presets')}
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'custom'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {t('custom')}
            </button>
            <button
              onClick={() => { setActiveTab('myCards'); loadSavedCards(); }}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'myCards'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {t('myCards')}
              {savedCards.length > 0 && (
                <span className="bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {savedCards.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Presets Tab */}
        {activeTab === 'presets' && (
          <div className="space-y-5">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === null
                    ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {t('all')}
              </button>
              {categoryKeys.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === cat
                      ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {t(`cat.${cat}` as keyof typeof import('@/lib/i18n').translations.en)}
                </button>
              ))}
            </div>

            {/* Info Banner */}
            <div className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-center">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                {t('presetsInfo')}
              </p>
              <p className="text-neutral-500 text-xs mt-1">
                {t('presetsHint')}
              </p>
            </div>

            {/* Preset Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredPresets.map(preset => (
                <PresetCard
                  key={preset.id}
                  text={preset.text}
                  codon={preset.codon}
                  hintEn={preset.hintEn}
                  hintZh={preset.hintZh}
                />
              ))}
            </div>
          </div>
        )}

        {/* Custom Tab */}
        {activeTab === 'custom' && (
          <div className="space-y-5">
            <div className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-center">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                {t('customInfo')}
              </p>
              <p className="text-neutral-500 text-xs mt-1">
                {t('customHint')}
              </p>
            </div>
            <Encoder onCardSaved={loadSavedCards} />
          </div>
        )}

        {/* My Cards Tab */}
        {activeTab === 'myCards' && (
          <div className="space-y-5">
            <div className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-center">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                {t('myCardsInfo')}
              </p>
            </div>

            {savedCards.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">
                  {t('noSavedCards')}
                </p>
                <p className="text-neutral-500 text-sm mt-2">
                  {t('noSavedCardsHint')}
                </p>
                <button
                  onClick={() => setActiveTab('custom')}
                  className="mt-6 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  {t('custom')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {savedCards.map(card => (
                  <SavedCardItem
                    key={card.id}
                    card={card}
                    onDelete={loadSavedCards}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-5">
            {t('howItWorks')}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xl mb-2">🧬</div>
              <h3 className="text-neutral-900 dark:text-neutral-100 font-medium mb-1.5 text-sm">{t('codonTitle')}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                {t('codonDesc')}
              </p>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xl mb-2">🔤</div>
              <h3 className="text-neutral-900 dark:text-neutral-100 font-medium mb-1.5 text-sm">{t('aminoTitle')}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                {t('aminoDesc')}
              </p>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xl mb-2">🔮</div>
              <h3 className="text-neutral-900 dark:text-neutral-100 font-medium mb-1.5 text-sm">{t('puzzleTitle')}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                {t('puzzleDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Codon Table Reference */}
        <div className="mt-8">
          <details className="bg-neutral-100 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <summary className="px-4 py-3 cursor-pointer text-neutral-900 dark:text-neutral-100 font-medium text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
              {t('viewCodonTable')}
            </summary>
            <div className="px-4 pb-4 pt-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { aa: 'A', name: 'Ala', codons: 'GCT GCC GCA GCG' },
                  { aa: 'C', name: 'Cys', codons: 'TGT TGC' },
                  { aa: 'D', name: 'Asp', codons: 'GAT GAC' },
                  { aa: 'E', name: 'Glu', codons: 'GAA GAG' },
                  { aa: 'F', name: 'Phe', codons: 'TTT TTC' },
                  { aa: 'G', name: 'Gly', codons: 'GGT GGC GGA GGG' },
                  { aa: 'H', name: 'His', codons: 'CAT CAC' },
                  { aa: 'I', name: 'Ile', codons: 'ATT ATC ATA' },
                  { aa: 'K', name: 'Lys', codons: 'AAA AAG' },
                  { aa: 'L', name: 'Leu', codons: 'TTA TTG CTT...' },
                  { aa: 'M', name: 'Met', codons: 'ATG' },
                  { aa: 'N', name: 'Asn', codons: 'AAT AAC' },
                  { aa: 'P', name: 'Pro', codons: 'CCT CCC CCA CCG' },
                  { aa: 'Q', name: 'Gln', codons: 'CAA CAG' },
                  { aa: 'R', name: 'Arg', codons: 'CGT CGC CGA...' },
                  { aa: 'S', name: 'Ser', codons: 'TCT TCC TCA...' },
                  { aa: 'T', name: 'Thr', codons: 'ACT ACC ACA ACG' },
                  { aa: 'V', name: 'Val', codons: 'GTT GTC GTA GTG' },
                  { aa: 'W', name: 'Trp', codons: 'TGG' },
                  { aa: 'Y', name: 'Tyr', codons: 'TAT TAC' },
                ].map(item => (
                  <div key={item.aa} className="bg-white dark:bg-neutral-800 rounded p-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-teal-700 dark:text-teal-400 font-bold">{item.aa}</span>
                      <span className="text-neutral-500 dark:text-neutral-500">{item.name}</span>
                    </div>
                    <div className="font-mono text-neutral-500 dark:text-neutral-600">{item.codons}</div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-12 py-5 text-center text-neutral-500 text-xs">
        <p>{t('footer')}</p>
      </footer>
    </main>
  );
}
