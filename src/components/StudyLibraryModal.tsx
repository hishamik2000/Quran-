import React, { useState } from 'react';
import { SavedStudyRecord, StudyContent } from '../types/quran';
import {
  X,
  Bookmark,
  Search,
  Star,
  Trash2,
  FileText,
  FileDown,
  BookOpen,
  Calendar,
  Edit3
} from 'lucide-react';

interface StudyLibraryModalProps {
  appLang: 'ar' | 'en';
  savedStudies: SavedStudyRecord[];
  onClose: () => void;
  onOpenStudy: (study: StudyContent) => void;
  onDeleteStudy: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onExportWordFromRecord: (study: StudyContent) => void;
  onExportPdfFromRecord: (study: StudyContent) => void;
}

export const StudyLibraryModal: React.FC<StudyLibraryModalProps> = ({
  appLang,
  savedStudies,
  onClose,
  onOpenStudy,
  onDeleteStudy,
  onToggleFavorite,
  onUpdateNotes,
  onExportWordFromRecord,
  onExportPdfFromRecord,
}) => {
  const isAr = appLang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [activeNotesText, setActiveNotesText] = useState('');

  const filtered = savedStudies.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.surahNameArabic.includes(searchQuery) ||
      s.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !filterFavorites || s.isFavorite;
    return matchesSearch && matchesFav;
  });

  const handleStartEditNotes = (record: SavedStudyRecord) => {
    setEditingNotesId(record.id);
    setActiveNotesText(record.notes || '');
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, activeNotesText);
    setEditingNotesId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#122b22] border border-emerald-900/20 dark:border-emerald-800/50 rounded-2xl max-w-4xl w-full shadow-2xl p-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-['Cairo'] text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-emerald-800 dark:text-amber-400" />
            <span>{isAr ? 'المكتبة الشخصية للدراسات المحفوظة' : 'Personal Saved Studies Library'}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مكتبتك الخاصة لحفظ ومراجعة وتصدير دراساتك القرآنية محلياً في المتصفح مع إمكانية تدوين الملاحظات الشخصية.'
              : 'Your local library to review, annotate, and re-export your Quranic tafsir studies.'}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 rtl:right-3 rtl:left-auto left-auto top-2.5" />
            <input
              type="text"
              placeholder={isAr ? 'ابحث في العناوين أو السور أو الملاحظات...' : 'Search studies by title, Surah, or notes...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 rtl:pr-9 rtl:pl-3 pl-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="button"
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              filterFavorites
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterFavorites ? 'fill-current text-amber-600' : ''}`} />
            <span>{isAr ? 'المفضلة فقط' : 'Favorites only'}</span>
          </button>
        </div>

        {/* Studies List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-['Cairo']">
                {isAr ? 'لا توجد دراسات محفوظة مطابقة لبحثك.' : 'No saved studies found.'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? 'يمكنك حفظ أي تدبر تنجزه بالضغط على زر «حفظ الدراسة».' : 'You can save any completed study by clicking "Save Study".'}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-700 transition-colors shadow-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base font-['Cairo'] text-emerald-950 dark:text-emerald-100">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className="text-slate-400 hover:text-amber-500"
                        title={isAr ? 'إضافة إلى المفضلة' : 'Toggle favorite'}
                      >
                        <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-['Amiri'] font-bold text-emerald-900 dark:text-amber-300">
                        {item.surahNameArabic}
                      </span>
                      <span>·</span>
                      <span>الآيات: {item.ayahRange}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.dateCreated).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onOpenStudy(item.studyData);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg shadow-xs"
                    >
                      {isAr ? 'فتح ومطالعة' : 'Open Study'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onExportWordFromRecord(item.studyData)}
                      className="p-1.5 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-md"
                      title={isAr ? 'تصدير إلى Word' : 'Export to Word'}
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onExportPdfFromRecord(item.studyData)}
                      className="p-1.5 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-md"
                      title={isAr ? 'تصدير PDF' : 'Export PDF'}
                    >
                      <FileDown className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteStudy(item.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-md"
                      title={isAr ? 'حذف الدراسة' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {editingNotesId === item.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={activeNotesText}
                        onChange={(e) => setActiveNotesText(e.target.value)}
                        className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md"
                        placeholder={isAr ? 'اكتب ملاحظاتك الشخصية...' : 'Write personal notes...'}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1 text-slate-500"
                        >
                          {isAr ? 'إلغاء' : 'Cancel'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(item.id)}
                          className="px-2.5 py-1 bg-emerald-800 text-white rounded-md font-semibold"
                        >
                          {isAr ? 'حفظ الملاحظة' : 'Save'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <div className="truncate flex-1 font-['Amiri'] text-sm">
                        <strong className="text-emerald-900 dark:text-amber-300 font-sans text-xs">
                          {isAr ? 'ملاحظاتي: ' : 'Notes: '}
                        </strong>
                        {item.notes || (isAr ? 'لا توجد ملاحظات مسجلة بعد.' : 'No notes yet.')}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStartEditNotes(item)}
                        className="text-slate-400 hover:text-emerald-700 ms-2 p-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
