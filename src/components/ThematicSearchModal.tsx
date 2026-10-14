import React, { useState } from 'react';
import { THEMATIC_TOPICS } from '../data/thematicIndex';
import { ThematicTopic } from '../types/quran';
import {
  X,
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface ThematicSearchModalProps {
  appLang: 'ar' | 'en';
  onClose: () => void;
  onSelectVerseToStudy: (surahNumber: number, ayahNumber: number) => void;
}

export const ThematicSearchModal: React.FC<ThematicSearchModalProps> = ({
  appLang,
  onClose,
  onSelectVerseToStudy,
}) => {
  const isAr = appLang === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(THEMATIC_TOPICS[0].id);

  const activeTopic = THEMATIC_TOPICS.find((t) => t.id === selectedTopicId) || THEMATIC_TOPICS[0];

  const filteredTopics = THEMATIC_TOPICS.filter(
    (t) =>
      t.titleArabic.includes(searchTerm) ||
      t.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.descriptionArabic.includes(searchTerm) ||
      t.verses.some((v) => v.textArabic.includes(searchTerm))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#122b22] border border-emerald-900/20 dark:border-emerald-800/50 rounded-2xl max-w-5xl w-full shadow-2xl p-6 relative max-h-[90vh] flex flex-col">
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
            <Search className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <span>{isAr ? 'محرك البحث الموضوعي القرآني' : 'Quranic Thematic Search Engine'}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'فهرس موضوعي موثق يربط الآيات بمحاور النفس، القلب، العقل، الصحة، والسنن مع إبراز سبب الارتباط والمرجع العلمي.'
              : 'Thematic index connecting verses to psyche, intellect, health, and ethics with documented reasons.'}
          </p>
        </div>

        {/* Search input */}
        <div className="mb-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 rtl:right-3 rtl:left-auto left-auto top-2.5" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن موضوع أو آية أو مفردة قرآنية...' : 'Search themes, verses, or keywords...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 rtl:pr-9 rtl:pl-3 pl-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Main Content Split: Categories list on left/right, Verses on main */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto">
          {/* Topic Pills / Sidebar */}
          <div className="md:col-span-4 space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === activeTopic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full p-2.5 rounded-lg border text-start transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-800 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-700'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-['Cairo'] flex items-center justify-between">
                    <span>{isAr ? topic.titleArabic : topic.titleEnglish}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({topic.verses.length})</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                    {topic.category}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Topic Verses and Details */}
          <div className="md:col-span-8 space-y-4 max-h-[500px] overflow-y-auto">
            <div className="p-3.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/30 border border-emerald-900/10">
              <h4 className="font-bold font-['Cairo'] text-sm sm:text-base text-emerald-950 dark:text-emerald-100 mb-1">
                {isAr ? activeTopic.titleArabic : activeTopic.titleEnglish}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-['Amiri']">
                {isAr ? activeTopic.descriptionArabic : activeTopic.descriptionEnglish}
              </p>
            </div>

            <div className="space-y-3">
              {activeTopic.verses.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-700 transition-colors shadow-xs"
                >
                  {/* Verse text */}
                  <div className="text-center py-2 mb-3 bg-[#fdfbf7] dark:bg-[#0a1a14] p-3 rounded-lg border border-amber-900/10">
                    <p className="text-base sm:text-lg font-['Amiri_Quran'] text-emerald-950 dark:text-emerald-100 leading-loose">
                      ﴿ {v.textArabic} ﴾
                    </p>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-['Amiri'] font-bold">
                      [{v.surahNameArabic}: الآية {v.ayahNumber}]
                    </div>
                  </div>

                  {/* Reason for connection as requested in Section 12 */}
                  <div className="text-xs space-y-1 mb-3">
                    <div className="text-slate-700 dark:text-slate-300 font-['Amiri'] text-sm">
                      <strong className="text-emerald-900 dark:text-amber-300 font-sans text-xs">
                        {isAr ? 'سبب ارتباط الآية بالموضوع: ' : 'Reason for Thematic Link: '}
                      </strong>
                      {isAr ? v.reasonForConnectionArabic : v.reasonForConnectionEnglish}
                    </div>

                    <div className="text-[11px] text-slate-500 font-sans flex items-center gap-1 mt-1">
                      <Tag className="w-3 h-3 opacity-60" />
                      <strong>{isAr ? 'مرجع الفهرس: ' : 'Index Reference: '}</strong>
                      {v.indexReference}
                    </div>
                  </div>

                  {/* Direct Launch Button */}
                  <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectVerseToStudy(v.surahNumber, v.ayahNumber);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-bold font-['Cairo'] text-white bg-emerald-900 hover:bg-emerald-950 dark:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isAr ? 'بدء تدبر هذه الآية في الأستوديو' : 'Study this Verse in Studio'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
