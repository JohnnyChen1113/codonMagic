'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, translations, TranslationKey } from '@/lib/i18n';

type Theme = 'light' | 'dark';
type DisplayMode = 'answer' | 'codon';

interface AppContextType {
  // Language
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Display mode (show answer or codon first)
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleDisplayMode: () => void;

  // Mounted state
  mounted: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [displayMode, setDisplayModeState] = useState<DisplayMode>('answer');
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedDisplayMode = localStorage.getItem('displayMode') as DisplayMode;

    if (savedLocale && (savedLocale === 'en' || savedLocale === 'zh')) {
      setLocaleState(savedLocale);
    }
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
      // Apply theme immediately
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Apply default dark theme
      document.documentElement.classList.add('dark');
    }
    if (savedDisplayMode && (savedDisplayMode === 'answer' || savedDisplayMode === 'codon')) {
      setDisplayModeState(savedDisplayMode);
    }

    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setDisplayMode = (newMode: DisplayMode) => {
    setDisplayModeState(newMode);
    localStorage.setItem('displayMode', newMode);
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'answer' ? 'codon' : 'answer');
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        t,
        theme,
        setTheme,
        toggleTheme,
        displayMode,
        setDisplayMode,
        toggleDisplayMode,
        mounted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
