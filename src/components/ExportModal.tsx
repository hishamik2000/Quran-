import React, { useState } from 'react';
import { StudyContent } from '../types/quran';
import { PdfExportOptions, triggerPdfPrint, downloadCleanPdfHtml, downloadPdfFile } from '../services/exportPdf';
import {
  X,
  FileDown,
  FileText,
  Printer,
  Check,
  Settings,
  Languages,
  CheckSquare,
  Square,
  Download
} from 'lucide-react';

interface ExportModalProps {
  study: StudyContent;
  appLang: 'ar' | 'en';
  onClose: () => void;
  onExportWord: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  study,
  appLang,
  onClose,
  onExportWord,
}) => {
  const isAr = appLang === 'ar';

  const [pdfOptions, setPdfOptions] = useState<PdfExportOptions>({
    language: study.metadata.languageMode === 'en' ? 'en' : study.metadata.languageMode === 'bilingual' ? 'bilingual' : 'ar',
    scopeMode: 'full',
    includeQuranText: true,
    includeComparativeTable: true,
    includeLinguistic: true,
    includeReflection: true,
    includeGuidance: true,
    includeHadith: true,
    includeIslamicMedicine: study.islamicMedicineAndScience?.enabled ?? false,
    includeReferences: true,
    paperSize: 'A4',
    includePageNumbers: true
  });

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      await downloadPdfFile(study, pdfOptions);
    } catch (err) {
      console.warn('Direct PDF download fallback to print:', err);
      triggerPdfPrint(study, pdfOptions);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrintPdf = () => {
    triggerPdfPrint(study, pdfOptions);
  };

  const toggleOption = (key: keyof PdfExportOptions) => {
    setPdfOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#122b22] border border-emerald-900/20 dark:border-emerald-800/50 rounded-2xl max-w-2xl w-full shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-start mb-5">
          <h3 className="text-xl font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
            <FileDown className="w-6 h-6 text-emerald-800 dark:text-amber-400" />
            <span>{isAr ? 'لوحة تصدير دراسة التدبر والتفسير' : 'Export Studio: Word & PDF'}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تصدير حقيقي متكامل بصيغة Word (.docx) أو PDF عالي الدقة يدعم اتصال الحروف العربية واتجاه RTL وتوثيق المراجع.'
              : 'Genuine vector PDF and editable DOCX formats with full Arabic typography, RTL alignment, and academic citations.'}
          </p>
        </div>

        {/* SECTION 1: PDF EXPORT (Section 10 Requirements: 3 Distinct Language Options) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 mb-5">
          <label className="block text-xs font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-emerald-700" />
            <span>{isAr ? 'خيارات لغة ملف PDF (ثلاثة خيارات مستقلة):' : 'PDF Language Modes (3 Distinct Modes):'}</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
            {/* Option 1: Arabic PDF */}
            <button
              type="button"
              onClick={() => setPdfOptions({ ...pdfOptions, language: 'ar' })}
              className={`p-3 rounded-lg border text-start cursor-pointer transition-all ${
                pdfOptions.language === 'ar'
                  ? 'border-emerald-800 bg-emerald-100/60 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-700'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-xs font-['Cairo'] mb-0.5">1. PDF باللغة العربية</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                {isAr ? 'منسق بالكامل بالعربية ودعم التشكيل واتصال الحروف' : 'Fully formatted in Arabic with Tashkeel'}
              </div>
            </button>

            {/* Option 2: English PDF */}
            <button
              type="button"
              onClick={() => setPdfOptions({ ...pdfOptions, language: 'en' })}
              className={`p-3 rounded-lg border text-start cursor-pointer transition-all ${
                pdfOptions.language === 'en'
                  ? 'border-emerald-800 bg-emerald-100/60 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-700'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-xs font-['Cairo'] mb-0.5">2. PDF English Mode</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                {isAr ? 'باللغة الإنجليزية مع الحفاظ على أسماء المراجع الأصلية' : 'English translation and academic commentary'}
              </div>
            </button>

            {/* Option 3: Bilingual PDF */}
            <button
              type="button"
              onClick={() => setPdfOptions({ ...pdfOptions, language: 'bilingual' })}
              className={`p-3 rounded-lg border text-start cursor-pointer transition-all ${
                pdfOptions.language === 'bilingual'
                  ? 'border-emerald-800 bg-emerald-100/60 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-700'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-xs font-['Cairo'] mb-0.5">3. PDF ثنائي اللغة</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                {isAr ? 'يجمع النص والتفسير بالعربية مع الترجمة المقابلة' : 'Bilingual paired paragraphs & citations'}
              </div>
            </button>
          </div>

          {/* Additional Options Checklist */}
          <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3">
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Settings className="w-3.5 h-3.5" />
              {isAr ? 'الأقسام المضمنة في تقرير PDF:' : 'Included Sections:'}
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfOptions.includeQuranText}
                  onChange={() => toggleOption('includeQuranText')}
                  className="rounded-sm text-emerald-800"
                />
                <span>{isAr ? 'تضمين النص القرآني' : 'Include Quranic text'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfOptions.includeComparativeTable}
                  onChange={() => toggleOption('includeComparativeTable')}
                  className="rounded-sm text-emerald-800"
                />
                <span>{isAr ? 'جدول المقارنة بين المفسرين' : 'Tafsir comparison table'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfOptions.includeLinguistic}
                  onChange={() => toggleOption('includeLinguistic')}
                  className="rounded-sm text-emerald-800"
                />
                <span>{isAr ? 'التحليل اللغوي والبلاغي' : 'Linguistic & Rhetoric'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfOptions.includeReflection}
                  onChange={() => toggleOption('includeReflection')}
                  className="rounded-sm text-emerald-800"
                />
                <span>{isAr ? 'التدبر والهدايات' : 'Reflection & Guidance'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfOptions.includeIslamicMedicine}
                  onChange={() => toggleOption('includeIslamicMedicine')}
                  className="rounded-sm text-emerald-800"
                />
                <span>{isAr ? 'قسم الطب الإسلامي والعلوم' : 'Islamic Medicine & Science'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdfOptions.includeReferences}
                  onChange={() => toggleOption('includeReferences')}
                  className="rounded-sm text-emerald-800"
                />
                <span>{isAr ? 'قائمة المراجع والمصادر الموثقة' : 'Verified References list'}</span>
              </label>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500">
            <span>{isAr ? 'حجم الورق: A4 قياسي' : 'Paper Size: Standard A4'}</span>
            <span>{isAr ? 'تذييل رسمي: د. هشام الخطيب' : 'Footer: Dr. Hisham Al-Khatib'}</span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex-1 py-2.5 px-4 text-sm font-bold font-['Cairo'] text-white bg-emerald-900 hover:bg-emerald-950 dark:bg-emerald-800 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
            >
              {isDownloadingPdf ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isAr ? 'جارٍ إنشاء وتحميل ملف PDF...' : 'Generating & Downloading PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? 'تحميل ملف PDF مباشر (بدون شعارات)' : 'Download PDF File (No Logo)'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handlePrintPdf}
              className="py-2.5 px-3.5 text-xs font-bold font-['Cairo'] text-emerald-900 dark:text-emerald-100 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 rounded-lg border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              title={isAr ? 'فتح نافذة الطباعة / الحفظ الافتراضية' : 'Open system print dialog'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة مباشرة' : 'Print View'}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCleanPdfHtml(study, pdfOptions)}
              className="py-2.5 px-3.5 text-xs font-bold font-['Cairo'] text-emerald-900 dark:text-emerald-100 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/60 dark:hover:bg-emerald-800 rounded-lg border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              title={isAr ? 'تحميل ملف المستند المنسق A4 بصيغة HTML جاهز للفتح والتحويل لـ PDF' : 'Download clean standalone HTML document'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل تقرير HTML' : 'Download HTML'}</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: WORD EXPORT (Section 9 Requirements) */}
        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-sm font-['Cairo'] text-blue-950 dark:text-blue-100 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>{isAr ? 'تصدير إلى Word (DOCX حقيقي قابل للتحرير)' : 'Export to Word (.docx)'}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr
                ? 'ملف مستند Word صالح يحتوي على العناوين، الجداول، الإحالات، وتذييل د. هشام الخطيب.'
                : 'Complete DOCX document with Word styles, tables, citations, and official footer.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onExportWord}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-950 dark:bg-blue-800 rounded-lg shadow-xs whitespace-nowrap cursor-pointer transition-colors"
          >
            {isAr ? 'تصدير إلى Word' : 'Download DOCX'}
          </button>
        </div>
      </div>
    </div>
  );
};
