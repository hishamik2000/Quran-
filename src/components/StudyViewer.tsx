import React, { useState } from 'react';
import { StudyContent, ContentClassification } from '../types/quran';
import {
  FileText,
  FileDown,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Scale,
  Sparkles,
  Compass,
  Stethoscope,
  Heart,
  HelpCircle,
  Library,
  Feather,
  Copy,
  Check,
  Tag
} from 'lucide-react';

interface StudyViewerProps {
  study: StudyContent;
  appLang: 'ar' | 'en';
  onExportWord: () => void;
  onOpenPdfModal: () => void;
  onSaveStudy: () => void;
  isSaved: boolean;
}

// Visual badge for the mandatory classification system (Section 6)
export const ClassificationBadge: React.FC<{ classification: ContentClassification }> = ({ classification }) => {
  let badgeColor = 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200';

  switch (classification) {
    case 'نص قرآني موثق':
      badgeColor = 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200';
      break;
    case 'نقل حرفي موثق':
      badgeColor = 'bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-950/80 dark:text-blue-200';
      break;
    case 'خلاصة تفسيرية':
      badgeColor = 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200';
      break;
    case 'تحليل لغوي أو بلاغي':
      badgeColor = 'bg-indigo-50 text-indigo-900 border-indigo-300 dark:bg-indigo-950/80 dark:text-indigo-200';
      break;
    case 'استنباط تدبري':
      badgeColor = 'bg-teal-50 text-teal-900 border-teal-300 dark:bg-teal-950/80 dark:text-teal-200';
      break;
    case 'معلومة علمية تحتاج إلى مصدر مستقل':
      badgeColor = 'bg-purple-50 text-purple-900 border-purple-300 dark:bg-purple-950/80 dark:text-purple-200';
      break;
    case 'معلومة لم يتم التحقق منها':
      badgeColor = 'bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${badgeColor}`}>
      <Tag className="w-2.5 h-2.5 opacity-60" />
      «{classification}»
    </span>
  );
};

export const StudyViewer: React.FC<StudyViewerProps> = ({
  study,
  appLang,
  onExportWord,
  onOpenPdfModal,
  onSaveStudy,
  isSaved,
}) => {
  const isAr = appLang === 'ar';
  const isBilingual = study.metadata.languageMode === 'bilingual';

  // Section collapse state (all open by default)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const toggleSection = (sec: string) => {
    setCollapsedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // User notes for reflection questions
  const [questionNotes, setQuestionNotes] = useState<Record<number, string>>({});
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyAyahs = () => {
    const text = study.verses.map(v => `﴿ ${v.textArabic} ﴾ [${study.metadata.surahNameArabic}: ${v.numberInSurah}]`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Floating Action Bar: Word export, PDF export, Save */}
      <div className="bg-white dark:bg-[#122b22] border border-emerald-900/10 dark:border-emerald-800/40 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-20 backdrop-blur-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
            <span>{isAr ? study.metadata.studyTitleArabic : study.metadata.studyTitleEnglish}</span>
            <ClassificationBadge classification="نص قرآني موثق" />
          </h2>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isAr ? 'السورة:' : 'Surah:'} {isAr ? study.metadata.surahNameArabic : study.metadata.surahNameEnglish} (#{study.metadata.surahNumber}) ·
            {isAr ? ' الآيات:' : ' Ayahs:'} {study.metadata.startAyah} - {study.metadata.endAyah}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Word Export Button as explicitly named in Section 9 */}
          <button
            type="button"
            onClick={onExportWord}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-950 dark:bg-blue-800 dark:hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            title={isAr ? 'تصدير دراسة التدبر إلى ملف Word (.docx) حقيقي' : 'Export to genuine Microsoft Word (.docx)'}
          >
            <FileText className="w-4 h-4 text-blue-200" />
            <span>{isAr ? 'تصدير إلى Word' : 'Export to Word (.docx)'}</span>
          </button>

          {/* PDF Export Button (Section 10) */}
          <button
            type="button"
            onClick={onOpenPdfModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-900 hover:bg-emerald-950 dark:bg-emerald-800 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            title={isAr ? 'تصدير إلى ملف PDF (عربي، إنجليزي، أو ثنائي)' : 'Export to PDF (Arabic, English, or Bilingual)'}
          >
            <FileDown className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'تصدير PDF' : 'Export PDF'}</span>
          </button>

          {/* Save Study Button */}
          <button
            type="button"
            onClick={onSaveStudy}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                : 'bg-white text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-amber-700' : ''}`} />
            <span>{isSaved ? (isAr ? 'محفوظة في المكتبة' : 'Saved') : (isAr ? 'حفظ الدراسة' : 'Save Study')}</span>
          </button>
        </div>
      </div>

      {/* SECTION A: Verified Quranic Text (أ. النص القرآني) */}
      <section className="bg-[#fdfbf7] dark:bg-[#0a1a14] border border-amber-800/20 dark:border-amber-700/30 rounded-xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between border-b border-amber-800/15 dark:border-amber-700/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'أ. النص القرآني الموثق بالرسم العثماني' : 'A. Verified Quranic Text'}
            </h3>
            <ClassificationBadge classification="نص قرآني موثق" />
          </div>
          <button
            type="button"
            onClick={handleCopyAyahs}
            className="flex items-center gap-1 text-xs text-emerald-800 dark:text-amber-300 hover:underline"
          >
            {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الآيات' : 'Copy')}</span>
          </button>
        </div>

        <div className="space-y-4 py-2 text-center">
          {study.verses.map((v) => (
            <div key={v.numberInSurah} className="pb-3 border-b border-amber-900/10 dark:border-amber-800/20 last:border-0">
              <p className="text-xl sm:text-2xl font-['Amiri_Quran'] text-emerald-950 dark:text-emerald-100 leading-loose">
                ﴿ {v.textArabic} ﴾
                <span className="text-sm font-mono font-bold text-amber-800 dark:text-amber-400 ms-2">
                  [{study.metadata.surahNameArabic}: {v.numberInSurah}]
                </span>
              </p>
              {(isBilingual || study.metadata.languageMode === 'en') && v.textEnglish && (
                <p className="text-sm text-slate-600 dark:text-slate-300 font-sans italic mt-1 max-w-4xl mx-auto">
                  "{v.textEnglish}"
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-start text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>
            {isAr ? 'مصدر التحقق:' : 'Verification source:'} {study.metadata.verificationSource || 'مصحف المدينة النبوية - مجمع الملك فهد'}
          </span>
          <span>
            {isAr ? 'رقم السورة:' : 'Surah No:'} {study.metadata.surahNumber} · {isAr ? 'عدد الآيات:' : 'Ayahs count:'} {study.metadata.totalAyahsSelected}
          </span>
        </div>
      </section>

      {/* SECTION B: General Meaning (ب. المعنى الإجمالي) */}
      <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('generalMeaning')}
        >
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
            <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'ب. المعنى الإجمالي وسياق الآيات' : 'B. Overall Contextual Meaning'}
            </h3>
            <ClassificationBadge classification="خلاصة تفسيرية" />
          </div>
          {collapsedSections['generalMeaning'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['generalMeaning'] && (
          <div className="mt-4 text-sm sm:text-base leading-relaxed space-y-3 font-['Amiri'] text-slate-800 dark:text-slate-100">
            {isAr && <p>{study.generalMeaning.arabic}</p>}
            {(isBilingual || study.metadata.languageMode === 'en') && (
              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic pt-2 border-t border-slate-100 dark:border-slate-800">
                {study.generalMeaning.english}
              </p>
            )}
          </div>
        )}
      </section>

      {/* SECTION C: Tafsir from Accredited Sources (ج. التفسير من المصادر) */}
      <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('tafsirCards')}
        >
          <div className="flex items-center gap-2">
            <Library className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'ج. التفسير من المصادر المعتمدة' : 'C. Exegesis from Accredited Classical Sources'}
            </h3>
            <span className="text-xs text-slate-500 font-sans">
              ({study.tafsirCards.length} {isAr ? 'مصادِر' : 'sources'})
            </span>
          </div>
          {collapsedSections['tafsirCards'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['tafsirCards'] && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {study.tafsirCards.map((t, idx) => (
              <div
                key={t.sourceId || idx}
                className="p-4 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-emerald-800/30 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 dark:border-emerald-800/20 pb-2">
                  <div>
                    <h4 className="font-bold font-['Cairo'] text-sm sm:text-base text-emerald-950 dark:text-emerald-100">
                      {isAr ? t.sourceNameArabic : t.sourceNameEnglish}
                    </h4>
                    <span className="text-xs text-amber-800 dark:text-amber-400 font-['Amiri'] font-semibold">
                      {t.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-sans">
                      {t.methodology}
                    </span>
                    <ClassificationBadge classification={t.isDirectVerbatimTextAvailable ? 'نقل حرفي موثق' : 'خلاصة تفسيرية'} />
                  </div>
                </div>

                <div className="text-sm font-['Amiri'] text-slate-800 dark:text-slate-100 leading-relaxed">
                  {isAr && <p>{t.commentaryArabic}</p>}
                  {(isBilingual || study.metadata.languageMode === 'en') && t.commentaryEnglish && (
                    <p className="font-sans text-xs text-slate-600 dark:text-slate-300 italic pt-1 mt-1 border-t border-slate-200 dark:border-slate-800">
                      {t.commentaryEnglish}
                    </p>
                  )}
                </div>

                {/* Key Insights bullets */}
                {t.keyInsightsArabic && t.keyInsightsArabic.length > 0 && (
                  <div className="pt-2 text-xs">
                    <span className="font-bold text-emerald-900 dark:text-amber-300 font-['Cairo']">
                      {isAr ? 'أهم الفوائد والاستنباطات:' : 'Key Insights:'}
                    </span>
                    <ul className="list-disc list-inside space-y-1 mt-1 text-slate-700 dark:text-slate-300">
                      {t.keyInsightsArabic.map((insight, i) => (
                        <li key={i}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {t.verificationNote && (
                  <div className="text-[11px] text-slate-500 italic mt-1">
                    {t.verificationNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION D: Comparative Analysis (د. المقارنة بين المفسرين) */}
      {study.comparativeAnalysis && study.comparativeAnalysis.issuesTable?.length > 0 && (
        <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('comparison')}
          >
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
              <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                {isAr ? 'د. المقارنة العلمية بين المفسرين' : 'D. Comparative Analysis of Exegetes'}
              </h3>
              <ClassificationBadge classification="خلاصة تفسيرية" />
            </div>
            {collapsedSections['comparison'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>

          {!collapsedSections['comparison'] && (
            <div className="mt-4 space-y-4">
              {/* Points of Agreement & Divergence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {study.comparativeAnalysis.pointsOfAgreement?.length > 0 && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="font-bold font-['Cairo'] text-emerald-900 dark:text-emerald-200 mb-1.5 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {isAr ? 'أوجه الاتفاق والإجماع:' : 'Points of Agreement:'}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                      {study.comparativeAnalysis.pointsOfAgreement.map((p, i) => (
                        <li key={i}>{isAr ? p.arabic : p.english}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {study.comparativeAnalysis.pointsOfDivergence?.length > 0 && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                    <div className="font-bold font-['Cairo'] text-amber-900 dark:text-amber-200 mb-1.5 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-amber-600" />
                      {isAr ? 'أوجه التمايز ودقائق الاختلاف:' : 'Points of Nuance & Divergence:'}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                      {study.comparativeAnalysis.pointsOfDivergence.map((p, i) => (
                        <li key={i}>{isAr ? p.arabic : p.english}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Issues Comparison Table */}
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                <table className="w-full text-xs text-start">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-['Cairo'] font-bold">
                    <tr>
                      <th className="p-3 w-1/3 text-start border-b border-slate-200 dark:border-slate-700">
                        {isAr ? 'المسألة التفسيرية / اللغوية / الفقهية' : 'Exegetical / Legal Issue'}
                      </th>
                      <th className="p-3 w-2/3 text-start border-b border-slate-200 dark:border-slate-700">
                        {isAr ? 'توجيهات وأقوال المفسرين' : 'Exegetical Positions & Directives'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {study.comparativeAnalysis.issuesTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="p-3 align-top">
                          <div className="font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-200 mb-1">
                            {isAr ? row.issueArabic : row.issueEnglish}
                          </div>
                          <ClassificationBadge classification={row.classification} />
                        </td>
                        <td className="p-3 align-top space-y-2">
                          {Object.entries(row.views).map(([src, v], i) => (
                            <div key={i} className="text-slate-800 dark:text-slate-200 font-['Amiri'] text-sm">
                              <span className="font-bold text-amber-900 dark:text-amber-400 font-sans text-xs">
                                [{src}]:
                              </span>{' '}
                              {isAr ? v.arabic : v.english}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* SECTION E: Linguistic and Rhetorical Analysis (هـ. التحليل اللغوي والبلاغي) */}
      <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('linguistic')}
        >
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'هـ. التحليل اللغوي وجذور المفردات والبلاغة' : 'E. Linguistic, Morphological & Rhetorical Analysis'}
            </h3>
            <ClassificationBadge classification="تحليل لغوي أو بلاغي" />
          </div>
          {collapsedSections['linguistic'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['linguistic'] && (
          <div className="mt-4 space-y-4">
            {/* Vocabulary Roots Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-['Cairo'] mb-2">
                {isAr ? 'معجم المفردات والجذور اللغوية:' : 'Vocabulary Roots & Morphology:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {study.linguisticAndRhetorical.vocabularyRoots.map((v, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold font-['Amiri'] text-emerald-900 dark:text-emerald-200">
                        {v.word}
                      </span>
                      <span className="font-mono px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 rounded-sm font-semibold">
                        جذر: {v.root}
                      </span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 mb-1 font-['Amiri'] text-sm">
                      {isAr ? v.meaningArabic : v.meaningEnglish}
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>{v.morphologyArabic}</span>
                      <span>[{v.lexiconRef}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar & Rhetoric */}
            <div className="p-4 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/30 border border-emerald-900/10 dark:border-emerald-800/30 text-sm font-['Amiri']">
              <h4 className="text-xs font-bold text-emerald-950 dark:text-amber-300 font-['Cairo'] mb-1">
                {isAr ? 'الإعراب ودقائق النظم والتراكيب:' : 'Syntax & Grammatical Nuances:'}
              </h4>
              <p className="text-slate-800 dark:text-slate-100 leading-relaxed">
                {isAr ? study.linguisticAndRhetorical.grammarAndSyntax.arabic : study.linguisticAndRhetorical.grammarAndSyntax.english}
              </p>
            </div>

            {/* Rhetorical Features */}
            {study.linguisticAndRhetorical.rhetoricalFeatures?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 font-['Cairo'] mb-2">
                  {isAr ? 'الأسرار البلاغية والتقديم والتأخير والتناسب:' : 'Rhetorical Subtleties & Phonetic Harmony:'}
                </h4>
                <div className="space-y-2">
                  {study.linguisticAndRhetorical.rhetoricalFeatures.map((rf, i) => (
                    <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-emerald-900 dark:text-amber-300 font-['Cairo']">
                          {isAr ? rf.categoryArabic : rf.categoryEnglish}
                        </span>
                        <span className="font-['Amiri'] font-bold text-amber-800 dark:text-amber-400 text-sm">
                          {rf.examplePhrase}
                        </span>
                      </div>
                      <p className="font-['Amiri'] text-sm text-slate-700 dark:text-slate-200">
                        {isAr ? rf.analysisArabic : rf.analysisEnglish}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SECTION F: Quranic Context and Coherence (و. السياق والترابط القرآني) */}
      <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('context')}
        >
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'و. السياق القرآني والترابط والوحدة الموضوعية' : 'F. Quranic Context, Flow & Thematic Coherence'}
            </h3>
            <ClassificationBadge classification="استنباط تدبري" />
          </div>
          {collapsedSections['context'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['context'] && (
          <div className="mt-4 space-y-3 text-sm font-['Amiri'] text-slate-800 dark:text-slate-100">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-xs font-['Cairo'] text-emerald-900 dark:text-emerald-200 block mb-1">
                {isAr ? 'محور السورة وعلاقة الآيات به:' : 'Surah Axis & Core Theme Connection:'}
              </span>
              <p>{isAr ? study.quranicContextAndCoherence.surahCentralAxis.arabic : study.quranicContextAndCoherence.surahCentralAxis.english}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'الترابط بما قبل الآيات:' : 'Connection to Preceding Verses:'}
                </span>
                <p className="font-['Amiri'] text-sm">
                  {isAr ? study.quranicContextAndCoherence.precedingConnection.arabic : study.quranicContextAndCoherence.precedingConnection.english}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'الترابط بما بعد الآيات:' : 'Connection to Succeeding Verses:'}
                </span>
                <p className="font-['Amiri'] text-sm">
                  {isAr ? study.quranicContextAndCoherence.subsequentConnection.arabic : study.quranicContextAndCoherence.subsequentConnection.english}
                </p>
              </div>
            </div>

            {/* Related Quranic Verses */}
            {study.quranicContextAndCoherence.relatedVerses?.length > 0 && (
              <div className="pt-2">
                <span className="font-bold text-xs font-['Cairo'] text-slate-700 dark:text-slate-300 block mb-1.5">
                  {isAr ? 'آيات قرآنية أخرى ذات صلة بالموضوع (تفسير القرآن بالقرآن):' : 'Related Verses (Quran Explaining Quran):'}
                </span>
                <div className="space-y-2">
                  {study.quranicContextAndCoherence.relatedVerses.map((rv, i) => (
                    <div key={i} className="p-2.5 rounded-md bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-900/10 text-xs">
                      <div className="font-bold text-emerald-900 dark:text-amber-300">
                        {rv.surahAyah}: <span className="font-['Amiri'] text-sm font-normal">﴿ {rv.textArabic} ﴾</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 mt-0.5 font-['Amiri'] text-sm">
                        {isAr ? rv.connectionArabic : rv.connectionEnglish}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SECTION G: Deep Reflection (ز. التدبر العميق) */}
      <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('deepReflection')}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-700 dark:text-rose-400" />
            <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'ز. التدبر العميق والأبعاد الإيمانية والإنسانية' : 'G. Deep Contemplation & Human Dimensions'}
            </h3>
            <ClassificationBadge classification="استنباط تدبري" />
          </div>
          {collapsedSections['deepReflection'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['deepReflection'] && (
          <div className="mt-4 space-y-4">
            <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-xs font-['Cairo'] text-emerald-900 dark:text-amber-300 block mb-1">
                {isAr ? 'الفكرة المركزية المهيمنة:' : 'Central Governing Thesis:'}
              </span>
              <p className="font-['Amiri'] text-base text-slate-800 dark:text-slate-100">
                {isAr ? study.deepReflection.centralIdea.arabic : study.deepReflection.centralIdea.english}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Faith Dimensions */}
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1.5 font-['Cairo']">
                  {isAr ? 'المعاني الإيمانية والروحية:' : 'Spiritual & Faith Dimensions:'}
                </span>
                <ul className="list-disc list-inside space-y-1 font-['Amiri'] text-sm text-slate-700 dark:text-slate-200">
                  {study.deepReflection.faithDimensions.map((d, i) => (
                    <li key={i}>{isAr ? d.arabic : d.english}</li>
                  ))}
                </ul>
              </div>

              {/* Moral & Educational */}
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1.5 font-['Cairo']">
                  {isAr ? 'الجوانب الأخلاقية والتربوية:' : 'Ethical & Educational Values:'}
                </span>
                <ul className="list-disc list-inside space-y-1 font-['Amiri'] text-sm text-slate-700 dark:text-slate-200">
                  {study.deepReflection.moralEducationalDimensions.map((d, i) => (
                    <li key={i}>{isAr ? d.arabic : d.english}</li>
                  ))}
                </ul>
              </div>

              {/* Practical Applications */}
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1.5 font-['Cairo']">
                  {isAr ? 'التطبيقات العملية في حياة المسلم:' : 'Practical Daily Applications:'}
                </span>
                <ul className="list-disc list-inside space-y-1 font-['Amiri'] text-sm text-slate-700 dark:text-slate-200">
                  {study.deepReflection.practicalApplications.map((d, i) => (
                    <li key={i}>{isAr ? d.arabic : d.english}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION H: Quranic Guidance (ح. الهدايات القرآنية) */}
      <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('guidance')}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
              {isAr ? 'ح. الهدايات القرآنية المصنفة وأساس استنباطها' : 'H. Categorized Quranic Guidance'}
            </h3>
            <ClassificationBadge classification="استنباط تدبري" />
          </div>
          {collapsedSections['guidance'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['guidance'] && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {study.quranicGuidance.map((g, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm bg-emerald-900 text-amber-200 font-bold text-[10px]">
                    {isAr ? g.category : g.categoryEnglish}
                  </span>
                  <ClassificationBadge classification={g.classification} />
                </div>
                <p className="font-['Amiri'] text-sm text-slate-900 dark:text-slate-100 font-medium pt-1">
                  {isAr ? g.guidanceArabic : g.guidanceEnglish}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <strong>{isAr ? 'أساس الاستنباط:' : 'Scriptural Basis:'}</strong> {isAr ? g.scripturalBasisArabic : g.scripturalBasisEnglish}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION I: Hadith and Athar (ط. الأحاديث والآثار) */}
      {study.hadithAndAthar?.length > 0 && (
        <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('hadith')}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
              <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                {isAr ? 'ط. الأحاديث النبوية والآثار الموثقة المتصلة بالآيات' : 'I. Verified Prophetic Hadiths & Narrations'}
              </h3>
              <ClassificationBadge classification="نقل حرفي موثق" />
            </div>
            {collapsedSections['hadith'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>

          {!collapsedSections['hadith'] && (
            <div className="mt-4 space-y-3">
              {study.hadithAndAthar.map((h, i) => (
                <div key={i} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 dark:text-amber-300 font-['Cairo']">
                      {isAr ? h.narratorArabic : h.narratorEnglish}
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-mono text-[11px] font-bold">
                      {isAr ? h.gradeArabic : h.gradeEnglish}
                    </span>
                  </div>
                  <p className="font-['Amiri'] text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed">
                    «{isAr ? h.textArabic : h.textEnglish}»
                  </p>
                  <div className="flex flex-wrap items-center justify-between text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span>
                      <strong>{isAr ? 'المصدر:' : 'Source:'}</strong> {isAr ? h.sourceArabic : h.sourceEnglish}
                    </span>
                    <span>
                      <strong>{isAr ? 'وجه الصلة:' : 'Relevance:'}</strong> {isAr ? h.relevanceArabic : h.relevanceEnglish}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION K: Islamic Medicine, Health & Human Physiology (ك. القرآن والإنسان والصحة والطب الإسلامي) */}
      {study.islamicMedicineAndScience && study.islamicMedicineAndScience.enabled && (
        <section className="bg-amber-50/40 dark:bg-amber-950/30 border border-amber-800/30 dark:border-amber-700/40 rounded-xl p-5 shadow-xs">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('medicine')}
          >
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              <div>
                <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                  {isAr ? 'ك. القرآن والإنسان والصحة والطب الإسلامي' : 'K. Quran, Human Physiology, Health & Islamic Medicine'}
                </h3>
                <span className="text-[11px] text-amber-800 dark:text-amber-400 font-['Amiri'] font-semibold">
                  {isAr ? 'وفق الضوابط العلمية والطبية لد. هشام الخطيب' : 'Curated under Dr. Hisham Al-Khatib’s scientific standard'}
                </span>
              </div>
            </div>
            {collapsedSections['medicine'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>

          {!collapsedSections['medicine'] && (
            <div className="mt-4 space-y-3 text-sm font-['Amiri']">
              <div className="p-3.5 rounded-lg bg-white dark:bg-[#122b22] border border-amber-700/20 text-slate-800 dark:text-slate-100 leading-relaxed">
                <p>{isAr ? study.islamicMedicineAndScience.reflectionArabic : study.islamicMedicineAndScience.reflectionEnglish}</p>
              </div>

              {/* Independent Scientific References & Caution Notice */}
              <div className="p-3 rounded-lg bg-amber-100/60 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 text-xs text-amber-950 dark:text-amber-200">
                <div className="font-bold mb-1">
                  {isAr ? 'تنبيه منهجي وطبي:' : 'Methodological & Clinical Notice:'}
                </div>
                <p className="italic">
                  {isAr ? study.islamicMedicineAndScience.disclaimerArabic : study.islamicMedicineAndScience.disclaimerEnglish}
                </p>
                {study.islamicMedicineAndScience.scientificReferences?.length > 0 && (
                  <div className="mt-2 pt-1 border-t border-amber-300 dark:border-amber-700 font-mono text-[11px]">
                    <strong>{isAr ? 'المراجع العلمية المستقلة:' : 'Independent Scientific References:'}</strong>{' '}
                    {study.islamicMedicineAndScience.scientificReferences.join(' · ')}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* SECTION L: Interactive Reflection Questions (ل. أسئلة التدبر) */}
      {study.reflectiveQuestions?.length > 0 && (
        <section className="bg-white dark:bg-[#122b22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('questions')}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
              <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                {isAr ? 'ل. أسئلة ومحاور التدبر الشخصي والتأمل' : 'L. Personal Reflection & Inquiry Questions'}
              </h3>
            </div>
            {collapsedSections['questions'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>

          {!collapsedSections['questions'] && (
            <div className="mt-4 space-y-3">
              {study.reflectiveQuestions.map((q) => (
                <div key={q.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-900 text-amber-300 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold font-['Cairo'] text-sm text-emerald-950 dark:text-emerald-100">
                        {isAr ? q.questionArabic : q.questionEnglish}
                      </p>
                      <p className="text-xs text-slate-500 font-['Amiri'] mt-0.5">
                        {isAr ? q.purposeArabic : q.purposeEnglish}
                      </p>
                    </div>
                  </div>
                  {/* Note area */}
                  <textarea
                    placeholder={isAr ? 'سجل تأملك أو إجابتك الشخصية هنا...' : 'Record your personal reflection note here...'}
                    rows={2}
                    value={questionNotes[q.id] || ''}
                    onChange={(e) => setQuestionNotes({ ...questionNotes, [q.id]: e.target.value })}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 font-['Amiri']"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION M: Mandatory Bibliography and Scholarly References (م. المراجع والمصادر العلمية الموثقة) */}
      <section className="bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-xl p-5 shadow-xs">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('references')}
        >
          <div className="flex items-center gap-2">
            <Library className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
            <div>
              <h3 className="text-base font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                {isAr ? 'المراجع والمصادر العلمية الموثقة (نظام التوثيق الإلزامي)' : 'Verified Scholarly References & Bibliography'}
              </h3>
              <span className="text-[11px] text-slate-500">
                {isAr ? 'قائمة المراجع المحققة مع تمييز المراجع المستفاد منها فعلياً' : 'Audited bibliography with in-text verified citations'}
              </span>
            </div>
          </div>
          {collapsedSections['references'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsedSections['references'] && (
          <div className="mt-4 space-y-2 text-xs font-['Amiri'] text-base">
            <ol className="divide-y divide-slate-200 dark:divide-slate-700 list-decimal list-inside space-y-1">
              {study.references.map((ref) => (
                <li key={ref.id} className="py-2 text-slate-800 dark:text-slate-200 leading-relaxed">
                  <span className="font-bold text-emerald-900 dark:text-amber-300 font-sans text-xs">
                    {ref.citationKey}
                  </span>{' '}
                  <strong className="text-slate-900 dark:text-slate-100 font-['Cairo'] text-sm">
                    {isAr ? ref.authorArabic : ref.authorEnglish}
                  </strong>{' '}
                  — <em>{isAr ? ref.bookTitleArabic : ref.bookTitleEnglish}</em>
                  {ref.volumePage && <span className="text-slate-600 dark:text-slate-400"> ({ref.volumePage})</span>}
                  <span className="ms-2 px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 rounded-xs text-[10px] font-sans font-semibold">
                    {isAr ? ref.verificationStatusArabic : ref.verificationStatusEnglish}
                  </span>
                  {ref.digitalUrl && (
                    <span className="ms-2 text-blue-600 dark:text-blue-400 underline font-sans text-[10px]">
                      {ref.digitalUrl}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* Official Study Footer with Dr. Hisham Al-Khatib credentials */}
      <footer className="text-center pt-6 pb-4 border-t border-emerald-900/10 dark:border-emerald-800/30 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-sm text-emerald-950 dark:text-amber-300 font-['Cairo'] mb-1">
          تدبّر آيات القرآن الكريم — Quranic Reflection & Tafsir Studio
        </div>
        <div className="font-['Amiri'] text-sm text-slate-800 dark:text-slate-200">
          د. هشام الخطيب · استشاري الأشعة التشخيصية · مهتم بالطب الإسلامي
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          {new Date(study.metadata.createdAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </footer>
    </div>
  );
};
