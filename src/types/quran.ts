export type LanguageMode = 'ar' | 'en' | 'bilingual';

export type StudyScope = 'single' | 'range' | 'surah';

export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'مكية' | 'مدنية';
  revelationOrder: number;
  juz: number[];
  centralThemeArabic: string;
  centralThemeEnglish: string;
  thematicDivisions?: {
    range: string;
    titleArabic: string;
    titleEnglish: string;
  }[];
}

export interface AyahText {
  numberInSurah: number;
  numberInQuran: number;
  textArabic: string;
  textEnglish: string;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  juz: number;
}

export interface TafsirSourceMeta {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  authorArabic: string;
  authorEnglish: string;
  deathYearH: number;
  methodologyArabic: string;
  methodologyEnglish: string;
  category: 'فقهي' | 'أثري بالمأثور' | 'لغوي وبلاغي' | 'إيماني تحليلي' | 'ميسر إجمالي' | 'جامع شامل';
  descriptionArabic: string;
  descriptionEnglish: string;
}

export type ContentClassification =
  | 'نص قرآني موثق'
  | 'نقل حرفي موثق'
  | 'خلاصة تفسيرية'
  | 'تحليل لغوي أو بلاغي'
  | 'استنباط تدبري'
  | 'معلومة علمية تحتاج إلى مصدر مستقل'
  | 'معلومة لم يتم التحقق منها';

export interface StudyMetadata {
  id: string;
  studyTitleArabic: string;
  studyTitleEnglish: string;
  scope: StudyScope;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  startAyah: number;
  endAyah: number;
  totalAyahsSelected: number;
  languageMode: LanguageMode;
  selectedTafsirIds: string[];
  includeIslamicMedicine: boolean;
  studyMode: 'brief' | 'detailed';
  createdAt: string;
  updatedAt: string;
  verificationSource: string;
}

export interface StudyContent {
  metadata: StudyMetadata;
  verses: AyahText[];
  generalMeaning: {
    arabic: string;
    english: string;
  };
  tafsirCards: {
    sourceId: string;
    sourceNameArabic: string;
    sourceNameEnglish: string;
    author: string;
    methodology: string;
    commentaryArabic: string;
    commentaryEnglish: string;
    keyInsightsArabic: string[];
    keyInsightsEnglish: string[];
    isDirectVerbatimTextAvailable: boolean;
    verificationNote: string;
    citationIndex?: number;
  }[];
  comparativeAnalysis: {
    pointsOfAgreement: { arabic: string; english: string }[];
    pointsOfDivergence: { arabic: string; english: string }[];
    issuesTable: {
      issueArabic: string;
      issueEnglish: string;
      views: {
        [sourceName: string]: {
          arabic: string;
          english: string;
        };
      };
      classification: ContentClassification;
    }[];
  };
  linguisticAndRhetorical: {
    vocabularyRoots: {
      word: string;
      root: string;
      morphologyArabic: string;
      morphologyEnglish: string;
      meaningArabic: string;
      meaningEnglish: string;
      lexiconRef: string;
    }[];
    grammarAndSyntax: {
      arabic: string;
      english: string;
    };
    rhetoricalFeatures: {
      categoryArabic: string;
      categoryEnglish: string;
      examplePhrase: string;
      analysisArabic: string;
      analysisEnglish: string;
      classification: ContentClassification;
    }[];
  };
  quranicContextAndCoherence: {
    precedingConnection: { arabic: string; english: string };
    subsequentConnection: { arabic: string; english: string };
    surahCentralAxis: { arabic: string; english: string };
    surahOpeningRelation?: { arabic: string; english: string };
    surahClosingRelation?: { arabic: string; english: string };
    thematicSections?: {
      range: string;
      titleArabic: string;
      titleEnglish: string;
      summaryArabic: string;
      summaryEnglish: string;
      referenceSource: string;
    }[];
    relatedVerses: {
      surahAyah: string;
      textArabic: string;
      connectionArabic: string;
      connectionEnglish: string;
    }[];
  };
  deepReflection: {
    centralIdea: { arabic: string; english: string };
    faithDimensions: { arabic: string; english: string }[];
    moralEducationalDimensions: { arabic: string; english: string }[];
    humanDimensions: { arabic: string; english: string }[];
    practicalApplications: { arabic: string; english: string }[];
  };
  quranicGuidance: {
    category: 'إيمانية' | 'أخلاقية' | 'تربوية' | 'اجتماعية' | 'عملية';
    categoryEnglish: 'Spiritual/Faith' | 'Ethical' | 'Educational' | 'Social' | 'Practical';
    guidanceArabic: string;
    guidanceEnglish: string;
    scripturalBasisArabic: string;
    scripturalBasisEnglish: string;
    classification: ContentClassification;
  }[];
  hadithAndAthar: {
    textArabic: string;
    textEnglish: string;
    narratorArabic: string;
    narratorEnglish: string;
    sourceArabic: string;
    sourceEnglish: string;
    gradeArabic: string;
    gradeEnglish: string;
    relevanceArabic: string;
    relevanceEnglish: string;
    classification: ContentClassification;
  }[];
  objectivesAndValues: {
    valueArabic: string;
    valueEnglish: string;
    manifestationArabic: string;
    manifestationEnglish: string;
    significanceArabic: string;
    significanceEnglish: string;
    indicationType: 'دلالة صريحة' | 'استنباط محتمل';
    indicationTypeEnglish: 'Explicit Indication' | 'Derived Deduction';
  }[];
  islamicMedicineAndScience?: {
    enabled: boolean;
    topics: string[];
    reflectionArabic: string;
    reflectionEnglish: string;
    scientificContextArabic: string;
    scientificContextEnglish: string;
    disclaimerArabic: string;
    disclaimerEnglish: string;
    scientificReferences: string[];
    classification: ContentClassification;
  };
  reflectiveQuestions: {
    id: number;
    questionArabic: string;
    questionEnglish: string;
    purposeArabic: string;
    purposeEnglish: string;
    userNote?: string;
  }[];
  references: {
    id: number;
    citationKey: string;
    authorArabic: string;
    authorEnglish: string;
    bookTitleArabic: string;
    bookTitleEnglish: string;
    volumePage: string;
    surahAyahContext: string;
    digitalUrl?: string;
    hadithSourceDetails?: string;
    linguisticRefDetails?: string;
    scientificRefDetails?: string;
    isDirectlyConsulted: boolean;
    verificationStatusArabic: 'تم التحقق من المصدر' | 'مرجع مقترح للمراجعة والاستزادة';
    verificationStatusEnglish: 'Verified Source' | 'Recommended Reference for Further Reading';
    categoryArabic: 'تفسير' | 'حديث وأثر' | 'لغة وبلاغة' | 'علوم وطب' | 'علوم القرآن';
  }[];
}

export interface SavedStudyRecord {
  id: string;
  title: string;
  surahNumber: number;
  surahNameArabic: string;
  ayahRange: string;
  scope: StudyScope;
  languageMode: LanguageMode;
  dateCreated: string;
  isFavorite: boolean;
  notes: string;
  studyData: StudyContent;
}

export interface ThematicTopic {
  id: string;
  titleArabic: string;
  titleEnglish: string;
  category: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  verses: {
    surahNumber: number;
    surahNameArabic: string;
    ayahNumber: number;
    textArabic: string;
    textEnglish: string;
    reasonForConnectionArabic: string;
    reasonForConnectionEnglish: string;
    indexReference: string;
  }[];
}
