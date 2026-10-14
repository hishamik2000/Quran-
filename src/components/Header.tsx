import React from 'react';
import { BookOpen, Bookmark, Search, Globe, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  appLang: 'ar' | 'en';
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenLibrary: () => void;
  onOpenThematicSearch: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  appLang,
  onToggleLang,
  isDark,
  onToggleTheme,
  onOpenLibrary,
  onOpenThematicSearch,
  savedCount,
}) => {
  const isAr = appLang === 'ar';

  return (
    <header className="border-b border-emerald-900/10 dark:border-emerald-800/30 bg-[#fdfbf7] dark:bg-[#0d1f18] transition-colors duration-200 sticky top-0 z-30 shadow-xs">
      {/* Top Bar Container following Top Bar Contract: Brand zone, Navigation links, and Primary actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title & Doctor credentials */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-900 dark:bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm border border-amber-600/30">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Cairo'] tracking-tight text-emerald-950 dark:text-emerald-100 leading-tight">
                تدبّر آيات القرآن الكريم
              </h1>
              <div className="text-xs font-medium text-amber-800 dark:text-amber-400 font-sans tracking-wide">
                Quranic Reflection & Tafsir Studio
              </div>
            </div>
          </div>

          {/* Author branding verbatim in this exact order as requested */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-700 dark:text-emerald-200/80 font-['Amiri'] font-medium">
            <span className="font-bold text-emerald-900 dark:text-amber-300">د. هشام الخطيب</span>
            <span aria-hidden="true" className="text-emerald-700/40">·</span>
            <span>استشاري الأشعة التشخيصية</span>
            <span aria-hidden="true" className="text-emerald-700/40">·</span>
            <span className="text-amber-800 dark:text-amber-300">مهتم بالطب الإسلامي</span>
          </div>
        </div>

        {/* Zone 2 & 3: Quick Navigation and Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Thematic Search Button */}
          <button
            type="button"
            onClick={onOpenThematicSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-900/15 dark:border-emerald-700/30 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors whitespace-nowrap"
            title={isAr ? 'البحث في الموضوعات القرآنية' : 'Thematic Quranic Search'}
          >
            <Search className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">{isAr ? 'البحث الموضوعي' : 'Thematic Search'}</span>
          </button>

          {/* Saved Studies Library Button */}
          <button
            type="button"
            onClick={onOpenLibrary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-900/15 dark:border-emerald-700/30 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors whitespace-nowrap"
            title={isAr ? 'مكتبة الدراسات المحفوظة' : 'Saved Studies Library'}
          >
            <Bookmark className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="hidden sm:inline">{isAr ? 'الدراسات المحفوظة' : 'Saved Studies'}</span>
            {savedCount > 0 && (
              <span className="text-xs font-bold px-1.5 py-0.2 bg-emerald-800 text-amber-200 rounded-md">
                {savedCount}
              </span>
            )}
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            title={isAr ? 'تبديل اللغة إلى الإنجليزية' : 'Switch Language to Arabic'}
          >
            <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          {/* Dark/Light Mode Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={isDark ? (isAr ? 'الوضع النهاري' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
          </button>
        </div>
      </div>
    </header>
  );
};
