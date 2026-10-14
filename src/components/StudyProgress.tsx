import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Loader2 } from 'lucide-react';

interface StudyProgressProps {
  appLang: 'ar' | 'en';
}

const STAGES_AR = [
  'استرجاع وتدقيق النص القرآني بالرسم العثماني الموثق...',
  'استقراء ومقارنة أقوال أئمة التفسير من المصادر المعتمدة...',
  'التحليل اللغوي وجذور المفردات والنحو والأسرار البلاغية...',
  'دراسة الوحدة الموضوعية والترابط وسياق السورة...',
  'استنباط الهدايات الإيمانية والتربوية والطبية المنضبطة...',
  'تدقيق الإحالات العلمية وبناء قائمة المراجع والمصادر...'
];

const STAGES_EN = [
  'Verifying authentic Uthmani Quranic script...',
  'Consulting and comparing accredited classical Tafsir sources...',
  'Analyzing vocabulary roots, syntax, and rhetorical subtleties...',
  'Examining thematic unity, context, and structural coherence...',
  'Extracting spiritual, ethical, and medical reflections...',
  'Verifying citations and constructing scholarly bibliography...'
];

export const StudyProgress: React.FC<StudyProgressProps> = ({ appLang }) => {
  const isAr = appLang === 'ar';
  const stages = isAr ? STAGES_AR : STAGES_EN;
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 2800);
    return () => clearInterval(interval);
  }, [stages.length]);

  const progressPercent = Math.round(((currentStageIndex + 1) / stages.length) * 100);

  return (
    <div className="bg-white dark:bg-[#122b22] border border-emerald-900/15 dark:border-emerald-800/40 rounded-xl p-6 sm:p-8 shadow-md max-w-2xl mx-auto my-10 text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-900 dark:text-amber-300 border border-emerald-900/20">
        <Loader2 className="w-7 h-7 animate-spin text-emerald-800 dark:text-amber-400" />
      </div>

      <h3 className="text-lg font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100 mb-2">
        {isAr ? 'جارٍ إعداد دراسة التدبر والتحليل العلمي' : 'Generating In-Depth Reflection & Study'}
      </h3>

      <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 font-['Amiri'] text-base">
        {stages[currentStageIndex]}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-emerald-800 dark:bg-amber-500 h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-start text-xs">
        {stages.map((stg, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2 p-2 rounded-md ${
                isDone
                  ? 'text-emerald-900 dark:text-emerald-300 font-medium'
                  : isCurrent
                  ? 'text-amber-900 dark:text-amber-300 font-bold bg-amber-50/50 dark:bg-amber-950/30'
                  : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0 animate-pulse" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
              )}
              <span className="truncate">{stg.replace('...', '')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
