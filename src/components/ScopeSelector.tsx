import React, { useState, useEffect } from 'react';
import { StudyScope, LanguageMode, AyahText } from '../types/quran';
import { SURAHS_METADATA } from '../data/quranMetadata';
import { TAFSIR_SOURCES } from '../data/tafsirSources';
import { fetchAyah, fetchAyahRange, searchQuranByPhrase, verifyManualQuranText } from '../services/quranApi';
import {
  BookMarked,
  Layers,
  Scroll,
  Search,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Stethoscope,
  Filter,
  Check,
  Languages,
  BookOpen
} from 'lucide-react';

interface ScopeSelectorProps {
  appLang: 'ar' | 'en';
  onStartStudy: (params: {
    scope: StudyScope;
    surahNumber: number;
    startAyah: number;
    endAyah: number;
    versesText: AyahText[];
    selectedTafsirIds: string[];
    includeIslamicMedicine: boolean;
    languageMode: LanguageMode;
    studyMode: 'brief' | 'detailed';
  }) => void;
  isLoading: boolean;
}

export const ScopeSelector: React.FC<ScopeSelectorProps> = ({
  appLang,
  onStartStudy,
  isLoading,
}) => {
  const isAr = appLang === 'ar';

  // Scope: 'single' | 'range' | 'surah'
  const [scope, setScope] = useState<StudyScope>('single');

  // Surah selection
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const currentSurah = SURAHS_METADATA.find(s => s.number === selectedSurahNumber) || SURAHS_METADATA[0];

  // Ayah numbers
  const [singleAyahNumber, setSingleAyahNumber] = useState<number>(1);
  const [startAyahNumber, setStartAyahNumber] = useState<number>(1);
  const [endAyahNumber, setEndAyahNumber] = useState<number>(Math.min(7, currentSurah.numberOfAyahs));

  // Study depth
  const [studyMode, setStudyMode] = useState<'brief' | 'detailed'>('detailed');

  // Language mode for the study output
  const [studyLanguageMode, setStudyLanguageMode] = useState<LanguageMode>('bilingual');

  // Tafsir sources selection
  const [selectedTafsirIds, setSelectedTafsirIds] = useState<string[]>([
    'muyassar',
    'ibnkathir',
    'ibnashur',
    'saadi',
    'qurtubi'
  ]);
  const [tafsirCategoryFilter, setTafsirCategoryFilter] = useState<string>('all');

  // Islamic medicine & science toggle
  const [includeIslamicMedicine, setIncludeIslamicMedicine] = useState<boolean>(true);

  // Search by phrase state
  const [phraseSearchQuery, setPhraseSearchQuery] = useState<string>('');
  const [phraseSearchResults, setPhraseSearchResults] = useState<{ surahNumber: number; ayahNumber: number; textArabic: string }[]>([]);
  const [isSearchingPhrase, setIsSearchingPhrase] = useState<boolean>(false);

  // Manual text verification state
  const [manualText, setManualText] = useState<string>('');
  const [manualVerificationResult, setManualVerificationResult] = useState<{
    verified: boolean;
    message: string;
    matchedAyah?: AyahText;
  } | null>(null);
  const [isVerifyingManual, setIsVerifyingManual] = useState<boolean>(false);

  // Preview of currently selected verses
  const [previewVerses, setPreviewVerses] = useState<AyahText[]>([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);

  // Reset ayah bounds when Surah changes
  useEffect(() => {
    setSingleAyahNumber(1);
    setStartAyahNumber(1);
    setEndAyahNumber(Math.min(scope === 'range' ? 5 : currentSurah.numberOfAyahs, currentSurah.numberOfAyahs));
  }, [selectedSurahNumber, scope]);

  // Load preview verses whenever selection changes
  useEffect(() => {
    let isCancelled = false;
    async function loadPreview() {
      setIsLoadingPreview(true);
      try {
        let verses: AyahText[] = [];
        if (scope === 'single') {
          const ayah = await fetchAyah(selectedSurahNumber, singleAyahNumber);
          verses = [ayah];
        } else if (scope === 'range') {
          verses = await fetchAyahRange(selectedSurahNumber, startAyahNumber, endAyahNumber);
        } else {
          // Full Surah: load first 7 verses for preview (or entire if short)
          const limit = Math.min(10, currentSurah.numberOfAyahs);
          verses = await fetchAyahRange(selectedSurahNumber, 1, limit);
        }
        if (!isCancelled) {
          setPreviewVerses(verses);
        }
      } catch (err) {
        console.error('Failed to load preview:', err);
      } finally {
        if (!isCancelled) setIsLoadingPreview(false);
      }
    }
    loadPreview();
    return () => {
      isCancelled = true;
    };
  }, [selectedSurahNumber, singleAyahNumber, startAyahNumber, endAyahNumber, scope]);

  // Handle phrase search
  const handleSearchPhrase = async () => {
    if (!phraseSearchQuery.trim()) return;
    setIsSearchingPhrase(true);
    try {
      const results = await searchQuranByPhrase(phraseSearchQuery);
      setPhraseSearchResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearchingPhrase(false);
    }
  };

  // Handle manual text verification
  const handleVerifyManualText = async () => {
    if (!manualText.trim()) return;
    setIsVerifyingManual(true);
    try {
      const res = await verifyManualQuranText(manualText);
      if (res.isValid && res.match) {
        setSelectedSurahNumber(res.match.surahNumber);
        setSingleAyahNumber(res.match.ayahNumber);
        setScope('single');
        setManualVerificationResult({
          verified: true,
          message: isAr ? res.messageArabic : res.messageEnglish,
          matchedAyah: {
            surahNumber: res.match.surahNumber,
            surahNameArabic: res.match.surahNameArabic,
            surahNameEnglish: `Surah ${res.match.surahNumber}`,
            numberInSurah: res.match.ayahNumber,
            numberInQuran: 0,
            textArabic: res.match.authenticTextArabic,
            textEnglish: res.match.authenticTextEnglish,
            juz: 1
          }
        });
      } else {
        setManualVerificationResult({
          verified: false,
          message: isAr ? res.messageArabic : res.messageEnglish
        });
      }
    } catch (e) {
      setManualVerificationResult({
        verified: false,
        message: isAr ? 'حدث خطأ أثناء فحص النص.' : 'An error occurred during verification.'
      });
    } finally {
      setIsVerifyingManual(false);
    }
  };

  // Tafsir toggle handlers
  const handleToggleTafsir = (id: string) => {
    if (selectedTafsirIds.includes(id)) {
      if (selectedTafsirIds.length > 1) {
        setSelectedTafsirIds(selectedTafsirIds.filter(i => i !== id));
      }
    } else {
      setSelectedTafsirIds([...selectedTafsirIds, id]);
    }
  };

  const handleSelectAllTafsirs = () => {
    setSelectedTafsirIds(TAFSIR_SOURCES.map(t => t.id));
  };

  const handleClearTafsirs = () => {
    setSelectedTafsirIds(['muyassar']);
  };

  // Filter tafsir sources by category
  const filteredTafsirs = tafsirCategoryFilter === 'all'
    ? TAFSIR_SOURCES
    : TAFSIR_SOURCES.filter(t => t.category === tafsirCategoryFilter);

  // Submit study
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const start = scope === 'single' ? singleAyahNumber : scope === 'range' ? startAyahNumber : 1;
    const end = scope === 'single' ? singleAyahNumber : scope === 'range' ? endAyahNumber : currentSurah.numberOfAyahs;

    // Guarantee verses match the latest selected Surah and Ayah numbers
    let verses = previewVerses;
    if (
      !verses ||
      verses.length === 0 ||
      verses[0].surahNumber !== selectedSurahNumber ||
      (scope === 'single' && verses[0].numberInSurah !== start)
    ) {
      try {
        if (scope === 'single') {
          const v = await fetchAyah(selectedSurahNumber, start);
          verses = [v];
        } else {
          verses = await fetchAyahRange(selectedSurahNumber, start, end);
        }
      } catch (e) {
        // Fallback verse structure
        verses = [{
          surahNumber: selectedSurahNumber,
          surahNameArabic: currentSurah.nameArabic,
          surahNameEnglish: currentSurah.nameEnglish,
          numberInSurah: start,
          numberInQuran: 0,
          textArabic: `سورة ${currentSurah.nameArabic} - الآية ${start}`,
          textEnglish: `Surah ${currentSurah.nameEnglish} - Ayah ${start}`,
          juz: 1
        }];
      }
    }

    onStartStudy({
      scope,
      surahNumber: selectedSurahNumber,
      startAyah: start,
      endAyah: end,
      versesText: verses,
      selectedTafsirIds,
      includeIslamicMedicine,
      languageMode: studyLanguageMode,
      studyMode
    });
  };

  return (
    <div className="bg-white dark:bg-[#122b22] border border-emerald-900/10 dark:border-emerald-800/40 rounded-xl shadow-sm p-4 sm:p-6 mb-8 transition-colors">
      <form onSubmit={handleFormSubmit}>
        {/* Step 1: Scope of Reflection Selector (3 Clear Options as per Section 2) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-900 dark:bg-emerald-800 text-amber-300 text-xs flex items-center justify-center font-bold">
                1
              </span>
              {isAr ? 'نطاق التدبر والدراسة' : 'Scope of Reflection & Study'}
            </label>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'اختر مستوى النطاق القرآني' : 'Select Quranic scope depth'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Option 1: Single Ayah */}
            <button
              type="button"
              onClick={() => setScope('single')}
              className={`p-3.5 rounded-lg border text-start transition-all cursor-pointer ${
                scope === 'single'
                  ? 'border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/60 dark:border-emerald-500 ring-1 ring-emerald-800/30'
                  : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <BookMarked className={`w-4 h-4 ${scope === 'single' ? 'text-emerald-800 dark:text-amber-300' : 'text-slate-500'}`} />
                <span className="font-bold text-sm font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                  {isAr ? 'تدبر آية واحدة' : 'Single Ayah Reflection'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr
                  ? 'دراسة تفصيلية لآية محددة مع مفرداتها وبلاغتها ومصادر تفسيرها والبحث بنصها.'
                  : 'Detailed study of a single verse with lexicon, rhetoric, and classical tafsirs.'}
              </p>
            </button>

            {/* Option 2: Range of Ayahs */}
            <button
              type="button"
              onClick={() => setScope('range')}
              className={`p-3.5 rounded-lg border text-start transition-all cursor-pointer ${
                scope === 'range'
                  ? 'border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/60 dark:border-emerald-500 ring-1 ring-emerald-800/30'
                  : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Layers className={`w-4 h-4 ${scope === 'range' ? 'text-emerald-800 dark:text-amber-300' : 'text-slate-500'}`} />
                <span className="font-bold text-sm font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                  {isAr ? 'تدبر مجموعة آيات' : 'Ayah Range Reflection'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr
                  ? 'تحليل مقطع قرآني ودراسة الوحدة الموضوعية والترابط اللفظي والمعنوي بين الآيات.'
                  : 'Study a passage exploring thematic unity, textual coherence, and progression.'}
              </p>
            </button>

            {/* Option 3: Whole Surah */}
            <button
              type="button"
              onClick={() => setScope('surah')}
              className={`p-3.5 rounded-lg border text-start transition-all cursor-pointer ${
                scope === 'surah'
                  ? 'border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/60 dark:border-emerald-500 ring-1 ring-emerald-800/30'
                  : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Scroll className={`w-4 h-4 ${scope === 'surah' ? 'text-emerald-800 dark:text-amber-300' : 'text-slate-500'}`} />
                <span className="font-bold text-sm font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                  {isAr ? 'تدبر سورة كاملة' : 'Complete Surah Reflection'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr
                  ? 'استيعاب المحور العام والمقاطع الموضوعية ومطلع السورة وخاتمتها ووحدتها العضوية.'
                  : 'Examine central axis, thematic divisions, opening/closing links, and holistic unity.'}
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Selection of Surah and Verses */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 p-4 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/30 border border-emerald-900/10 dark:border-emerald-800/30">
          {/* Surah dropdown */}
          <div className="md:col-span-6">
            <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1.5">
              {isAr ? 'اختيار السورة الكريمة' : 'Select Surah'}
            </label>
            <select
              value={selectedSurahNumber}
              onChange={(e) => setSelectedSurahNumber(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
            >
              {SURAHS_METADATA.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.nameArabic} — {s.nameEnglish} ({s.revelationType} · {s.numberOfAyahs} {isAr ? 'آية' : 'ayahs'})
                </option>
              ))}
            </select>
            <div className="mt-1.5 text-xs text-slate-600 dark:text-emerald-300/80 font-['Amiri']">
              <strong>{isAr ? 'المحور العام: ' : 'Central Axis: '}</strong>
              {isAr ? currentSurah.centralThemeArabic : currentSurah.centralThemeEnglish}
            </div>
          </div>

          {/* Verses inputs based on scope */}
          {scope === 'single' && (
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1.5">
                {isAr ? 'رقم الآية' : 'Ayah Number'} (1 - {currentSurah.numberOfAyahs})
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={currentSurah.numberOfAyahs}
                  value={singleAyahNumber}
                  onChange={(e) => setSingleAyahNumber(Math.max(1, Math.min(Number(e.target.value), currentSurah.numberOfAyahs)))}
                  className="w-28 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? `من إجمالي ${currentSurah.numberOfAyahs} آية` : `of ${currentSurah.numberOfAyahs} total`}
                </span>
              </div>
            </div>
          )}

          {scope === 'range' && (
            <div className="md:col-span-6 flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1.5">
                  {isAr ? 'الآية الأولى' : 'Start Ayah'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={endAyahNumber}
                  value={startAyahNumber}
                  onChange={(e) => setStartAyahNumber(Math.max(1, Math.min(Number(e.target.value), endAyahNumber)))}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1.5">
                  {isAr ? 'الآية الأخيرة' : 'End Ayah'}
                </label>
                <input
                  type="number"
                  min={startAyahNumber}
                  max={currentSurah.numberOfAyahs}
                  value={endAyahNumber}
                  onChange={(e) => setEndAyahNumber(Math.max(startAyahNumber, Math.min(Number(e.target.value), currentSurah.numberOfAyahs)))}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
              <div className="pt-5">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  ({endAyahNumber - startAyahNumber + 1} {isAr ? 'آيات' : 'ayahs'})
                </div>
              </div>
            </div>
          )}

          {scope === 'surah' && (
            <div className="md:col-span-6 flex flex-col justify-center">
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                {isAr ? 'نطاق دراسة السورة بالكامل' : 'Whole Surah Scope'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                {isAr
                  ? `تشمل السورة جميع الآيات من 1 إلى ${currentSurah.numberOfAyahs} مع تقسيمها لمقاطع موضوعية.`
                  : `Covers all verses 1 to ${currentSurah.numberOfAyahs} with thematic section divisions.`}
              </div>
              {currentSurah.thematicDivisions && currentSurah.thematicDivisions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {currentSurah.thematicDivisions.map((div, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 rounded-md">
                      {div.range}: {isAr ? div.titleArabic : div.titleEnglish}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Helper Tools for Single Ayah Scope: Phrase Search & Manual Text Verification */}
          {scope === 'single' && (
            <div className="md:col-span-12 border-t border-emerald-900/10 dark:border-emerald-800/30 pt-3 mt-1 flex flex-col gap-3">
              {/* Tool A: Search by phrase */}
              <div>
                <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 mb-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-600" />
                  {isAr ? 'البحث عن الآية بعبارة من نصها:' : 'Search verse by text snippet:'}
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={isAr ? 'اكتب كلمة أو جزءاً من الآية للبحث عنها...' : 'Enter word or phrase to locate verse...'}
                    value={phraseSearchQuery}
                    onChange={(e) => setPhraseSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearchPhrase())}
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleSearchPhrase}
                    disabled={isSearchingPhrase}
                    className="px-3 py-1.5 text-xs font-medium text-emerald-900 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-800 hover:bg-emerald-200 rounded-lg"
                  >
                    {isSearchingPhrase ? (isAr ? 'جارٍ البحث...' : 'Searching...') : (isAr ? 'بحث' : 'Search')}
                  </button>
                </div>
                {phraseSearchResults.length > 0 && (
                  <div className="mt-2 max-h-36 overflow-y-auto space-y-1.5 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-md text-xs">
                    {phraseSearchResults.map((r, i) => (
                      <div
                        key={i}
                        onClick={async () => {
                          setSelectedSurahNumber(r.surahNumber);
                          setSingleAyahNumber(r.ayahNumber);
                          setScope('single');
                          setPhraseSearchResults([]);
                          try {
                            const v = await fetchAyah(r.surahNumber, r.ayahNumber);
                            setPreviewVerses([v]);
                          } catch (e) {
                            // ignore
                          }
                        }}
                        className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-sm cursor-pointer flex justify-between items-center"
                      >
                        <span className="font-['Amiri'] text-emerald-950 dark:text-emerald-100 truncate flex-1">{r.textArabic}</span>
                        <span className="text-slate-500 shrink-0 font-sans ms-2">
                          [سورة {r.surahNumber} : آية {r.ayahNumber}]
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tool B: Manual text entry with verification */}
              <div>
                <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  {isAr ? 'إدخال نص الآية يدويًا مع التحقق من النص قبل اعتباره قرآنيًا:' : 'Enter verse text manually with authentic verification:'}
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={isAr ? 'ألصق أو اكتب نص الآية للتحقق منها ومطابقتها مع المصحف...' : 'Paste text to verify against verified Quran...'}
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 font-['Amiri']"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyManualText}
                    disabled={isVerifyingManual}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg whitespace-nowrap"
                  >
                    {isVerifyingManual ? (isAr ? 'جارٍ التحقق...' : 'Verifying...') : (isAr ? 'تحقق ومطابقة' : 'Verify')}
                  </button>
                </div>
                {manualVerificationResult && (
                  <div
                    className={`mt-2 p-2 rounded-md text-xs flex items-center gap-2 ${
                      manualVerificationResult.verified
                        ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300'
                        : 'bg-rose-50 text-rose-900 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300'
                    }`}
                  >
                    {manualVerificationResult.verified ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{manualVerificationResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview of Verified Quranic Text */}
        <div className="mb-6 p-4 rounded-lg bg-[#fcfaf5] dark:bg-[#0a1a14] border border-amber-800/20 dark:border-amber-700/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 font-['Cairo'] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              {isAr ? 'معاينة النص القرآني الموثق' : 'Verified Quranic Text Preview'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'مصدر موثق بالرسم العثماني' : 'Uthmani Script · Verified'}
            </span>
          </div>

          {isLoadingPreview ? (
            <div className="py-4 text-center text-xs text-slate-500 animate-pulse">
              {isAr ? 'جارٍ تحميل النص القرآني الموثق...' : 'Loading verified verses...'}
            </div>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {previewVerses.map((v) => (
                <div key={v.numberInSurah} className="text-center py-1 border-b border-amber-900/10 dark:border-amber-800/20 last:border-0">
                  <div className="text-base sm:text-lg font-['Amiri_Quran'] text-emerald-950 dark:text-emerald-100 leading-loose">
                    ﴿ {v.textArabic} ﴾
                    <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 ms-2">
                      ({v.numberInSurah})
                    </span>
                  </div>
                  {studyLanguageMode !== 'ar' && v.textEnglish && (
                    <div className="text-xs font-sans text-slate-600 dark:text-slate-300 italic mt-1 max-w-3xl mx-auto">
                      "{v.textEnglish}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 3: Accredited Tafsir Sources Selector (Section 3 of User Requirements) */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <label className="text-sm font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-900 dark:bg-emerald-800 text-amber-300 text-xs flex items-center justify-center font-bold">
                2
              </span>
              {isAr ? 'مصادر التفسير المعتمدة والمقارنة' : 'Accredited Tafsir Sources & Comparison'}
            </label>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleSelectAllTafsirs}
                className="text-emerald-800 dark:text-amber-300 hover:underline font-medium"
              >
                {isAr ? 'اختيار جميع التفاسير (10)' : 'Select All (10)'}
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleClearTafsirs}
                className="text-slate-600 dark:text-slate-400 hover:underline"
              >
                {isAr ? 'تفسير واحد' : 'Single Tafsir'}
              </button>
            </div>
          </div>

          {/* Filter by methodology */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs">
            <span className="text-slate-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" />
              {isAr ? 'المنهج:' : 'Category:'}
            </span>
            {[
              { id: 'all', labelAr: 'الكل', labelEn: 'All' },
              { id: 'ميسر إجمالي', labelAr: 'ميسر إجمالي', labelEn: 'Concise' },
              { id: 'أثري بالمأثور', labelAr: 'بالمأثور', labelEn: 'Narrated' },
              { id: 'فقهي', labelAr: 'أحكام وفقه', labelEn: 'Legal' },
              { id: 'لغوي وبلاغي', labelAr: 'بلاغي ولغوي', labelEn: 'Rhetoric' },
              { id: 'إيماني تحليلي', labelAr: 'إيماني وتربوي', labelEn: 'Pedagogical' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setTafsirCategoryFilter(f.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  tafsirCategoryFilter === f.id
                    ? 'bg-emerald-900 text-amber-200 font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {isAr ? f.labelAr : f.labelEn}
              </button>
            ))}
          </div>

          {/* Tafsir sources grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredTafsirs.map((t) => {
              const isSelected = selectedTafsirIds.includes(t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => handleToggleTafsir(t.id)}
                  className={`p-2.5 rounded-lg border text-start cursor-pointer transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/70 dark:border-emerald-500'
                      : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-emerald-800 border-emerald-800 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs font-['Cairo'] text-emerald-950 dark:text-emerald-100 truncate">
                      {isAr ? t.nameArabic : t.nameEnglish}
                    </div>
                    <div className="text-[11px] text-amber-800 dark:text-amber-400 truncate">
                      {isAr ? t.authorArabic : t.authorEnglish}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {isAr ? t.category : t.category} · {t.deathYearH} هـ
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedTafsirIds.length >= 2 && (
            <div className="mt-2 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {isAr
                ? `سيتم تضمين جدول مقارنة علمي يبرز أوجه الاتفاق والاختلاف بين (${selectedTafsirIds.length}) تفاسير.`
                : `A comparative table highlighting agreements and divergence across (${selectedTafsirIds.length}) tafsirs will be generated.`}
            </div>
          )}
        </div>

        {/* Step 4: Study Configurations & Special Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          {/* Study Language Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              {isAr ? 'لغة نتائج الدراسة' : 'Study Language'}
            </label>
            <div className="flex gap-1">
              {[
                { id: 'bilingual', labelAr: 'ثنائية اللغة (عربي / English)', labelEn: 'Bilingual (AR / EN)' },
                { id: 'ar', labelAr: 'عربية بالكامل', labelEn: 'Arabic Only' },
                { id: 'en', labelAr: 'English Only', labelEn: 'English Only' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStudyLanguageMode(opt.id as LanguageMode)}
                  className={`flex-1 py-1.5 px-2 text-xs rounded-md font-medium border text-center transition-colors cursor-pointer ${
                    studyLanguageMode === opt.id
                      ? 'bg-emerald-900 text-amber-200 border-emerald-900 dark:bg-emerald-700'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {isAr ? opt.labelAr : opt.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Study Depth Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              {isAr ? 'عمق الدراسة' : 'Study Depth'}
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setStudyMode('detailed')}
                className={`flex-1 py-1.5 px-2 text-xs rounded-md font-medium border text-center transition-colors cursor-pointer ${
                  studyMode === 'detailed'
                    ? 'bg-emerald-900 text-amber-200 border-emerald-900 dark:bg-emerald-700'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                }`}
              >
                {isAr ? 'تفصيلية شاملة' : 'Comprehensive Detailed'}
              </button>
              <button
                type="button"
                onClick={() => setStudyMode('brief')}
                className={`flex-1 py-1.5 px-2 text-xs rounded-md font-medium border text-center transition-colors cursor-pointer ${
                  studyMode === 'brief'
                    ? 'bg-emerald-900 text-amber-200 border-emerald-900 dark:bg-emerald-700'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                }`}
              >
                {isAr ? 'موجزة مركزة' : 'Concise Focused'}
              </button>
            </div>
          </div>

          {/* Islamic Medicine & Science Module Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-amber-600" />
              {isAr ? 'قسم الطب الإسلامي والعلوم' : 'Islamic Medicine & Science Section'}
            </label>
            <button
              type="button"
              onClick={() => setIncludeIslamicMedicine(!includeIslamicMedicine)}
              className={`w-full py-1.5 px-3 text-xs rounded-md font-medium border flex items-center justify-between transition-colors cursor-pointer ${
                includeIslamicMedicine
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-950 dark:text-amber-200'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{isAr ? 'تأملات الطب الإسلامي والصحة' : 'Include Health & Prophetic Medicine'}</span>
              <span className={`text-xs font-bold ${includeIslamicMedicine ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`}>
                {includeIslamicMedicine ? (isAr ? 'مُفعّل' : 'Enabled') : (isAr ? 'معطل' : 'Disabled')}
              </span>
            </button>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {isAr
                ? 'وفق ضوابط د. هشام الخطيب: تمييز التفسير الشرعي عن الطب السريري وعدم ادعاء إعجاز متكلف.'
                : 'Dr. Hisham Al-Khatib’s standard: strict demarcation between spiritual reflection and clinical science.'}
            </p>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="flex justify-end items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3 text-sm font-bold font-['Cairo'] text-white bg-emerald-900 hover:bg-emerald-950 dark:bg-emerald-800 dark:hover:bg-emerald-700 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>
              {isLoading
                ? (isAr ? 'جارٍ إعداد الدراسة العلمية والتوثيق...' : 'Generating Scholarly Study & Citations...')
                : (isAr ? 'بدء التدبر والدراسة العلمية الموثقة' : 'Start Verified Reflection & Study')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
