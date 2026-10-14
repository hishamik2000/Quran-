import { StudyContent } from '../types/quran';

export const INITIAL_SEED_STUDY: StudyContent = {
  metadata: {
    id: 'seed-fatihah-1-7',
    studyTitleArabic: 'تدبر سورة الفاتحة — أم الكتاب والسبع المثاني',
    studyTitleEnglish: 'Reflection on Surah Al-Fatihah — The Mother of the Book',
    scope: 'surah',
    surahNumber: 1,
    surahNameArabic: 'الفاتحة',
    surahNameEnglish: 'Al-Fatihah',
    startAyah: 1,
    endAyah: 7,
    totalAyahsSelected: 7,
    languageMode: 'bilingual',
    selectedTafsirIds: ['muyassar', 'ibnkathir', 'ibnashur', 'saadi', 'qurtubi'],
    includeIslamicMedicine: true,
    studyMode: 'detailed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verificationSource: 'مصحف المدينة النبوية — مجمع الملك فهد لطباعة المصحف الشريف'
  },
  verses: [
    {
      numberInSurah: 1,
      numberInQuran: 1,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      textEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      juz: 1
    },
    {
      numberInSurah: 2,
      numberInQuran: 2,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      textEnglish: '[All] praise is [due] to Allah, Lord of the worlds -',
      juz: 1
    },
    {
      numberInSurah: 3,
      numberInQuran: 3,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      textEnglish: 'The Entirely Merciful, the Especially Merciful,',
      juz: 1
    },
    {
      numberInSurah: 4,
      numberInQuran: 4,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'مَالِكِ يَوْمِ الدِّينِ',
      textEnglish: 'Sovereign of the Day of Recompense.',
      juz: 1
    },
    {
      numberInSurah: 5,
      numberInQuran: 5,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      textEnglish: 'It is You we worship and You we ask for help.',
      juz: 1
    },
    {
      numberInSurah: 6,
      numberInQuran: 6,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      textEnglish: 'Guide us to the straight path -',
      juz: 1
    },
    {
      numberInSurah: 7,
      numberInQuran: 7,
      surahNumber: 1,
      surahNameArabic: 'الفاتحة',
      surahNameEnglish: 'Al-Fatihah',
      textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      textEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      juz: 1
    }
  ],
  generalMeaning: {
    arabic: 'سورة الفاتحة هي أم الكتاب وأساس مقاصد القرآن الكريم؛ تبدأ بتمجيد الله والثناء عليه بصفات الربوبية والرحمة الشاملة، ثم تقرر حقيقة المعاد ويوم الدين، وتنتقل في شطرها الثاني إلى إعلان التوحيد الخالص بإفراد الله بالعبادة والاستعانة، وتختتم بأعظم دعاء قرآني وهو طلب الهداية إلى الصراط المستقيم، صراط المنعم عليهم السالمين من الغضب والضلال.',
    english: 'Surah Al-Fatihah is the foundational core of the Quran. It opens with praise and glorification of Allah through His universal Lordship and infinite Mercy, establishes absolute sovereignty on Judgment Day, transitions into pure monotheistic devotion by declaring exclusive worship and reliance on Him, and concludes with the paramount supplication for perpetual guidance upon the Straight Path.'
  },
  tafsirCards: [
    {
      sourceId: 'muyassar',
      sourceNameArabic: 'التفسير الميسر',
      sourceNameEnglish: 'Al-Tafsir Al-Muyassar',
      author: 'نخبة من علماء التفسير (مجمع الملك فهد)',
      methodology: 'تفسير إجمالي موثق للمعنى المعتمد',
      commentaryArabic: 'افتتح الله تعالى كتابه بالبسملة ترشيداً لعباده بالبدء باسمه المبارك. والحمد لله ثناء مستحق لله لكمال صفاته وجزيل نعمه. (رب العالمين) مالك الخلق ومدبر شؤونهم. (الرحمن الرحيم) ذو الرحمة العامة والخاصة. (مالك يوم الدين) المتفرد بالحكم يوم الجزاء. (إياك نعبد وإياك نستعين) نخصك وحدك بالعبادة والاستعانة. ثم طلب الهداية للصراط السوي صراط النبيين والصديقين.',
      commentaryEnglish: 'Allah begins His Book with the Basmalah instructing servants to commence all matters in His name. Praise belongs exclusively to Allah for His absolute perfection and bounties. Lord of the worlds indicates His supreme ownership and sustenance of all creation.',
      keyInsightsArabic: ['البداءة باسم الله في كل عمل صالح', 'تقديم الثناء على الطلب أدب نبوي رفيع', 'إفراد الله بالعبادة والاستعانة يحقق التوحيد العملي'],
      keyInsightsEnglish: ['Initiating endeavors with the Divine Name', 'Etiquette of praise before petition', 'Pure monotheism through exclusive worship and reliance'],
      isDirectVerbatimTextAvailable: true,
      verificationNote: 'مراجع ومعتمد من مجمع الملك فهد لطباعة المصحف الشريف'
    },
    {
      sourceId: 'ibnkathir',
      sourceNameArabic: 'تفسير ابن كثير',
      sourceNameEnglish: 'Tafsir Ibn Kathir',
      author: 'الحافظ عماد الدين إسماعيل بن كثير',
      methodology: 'تفسير القرآن بالقرآن والحديث والآثار',
      commentaryArabic: 'ذكر ابن كثير في فضائل الفاتحة حديث أبي سعيد بن المعلى في كونها أعظم سورة في القرآن، وحديث المناجاة (قسمت الصلاة بيني وبين عبدي نصفين ولعبدي ما سأل). وبيّن أن الجمع بين (الرحمن) و(الرحيم) دال على سعة الرحمة ورقتها ووصولها لأهل الإيمان، وأن تقديم العبادة على الاستعانة من باب تقديم الغايات على الوسائل.',
      commentaryEnglish: 'Ibn Kathir documents authentic narrations regarding Al-Fatihah as the greatest Surah, notably the Hadith Qudsi where Allah divides the prayer between Himself and His servant. He elucidates that worship is prioritized over seeking aid because worship is the ultimate purpose while aid is the means.',
      keyInsightsArabic: ['حديث قسمة الصلاة يبرز المشافهة والمناجاة الحية بين العبد وربه', 'تقديم المفعول (إياك) يفيد الحصر والاختصاص في لغة العرب'],
      keyInsightsEnglish: ['The Hadith of Divine dialogue underscores intimate communion in prayer', 'Fronting the pronoun (Iyyaka) denotes exclusivity in Arabic rhetoric'],
      isDirectVerbatimTextAvailable: true,
      verificationNote: 'تفسير القرآن العظيم (طبعة دار طيبة، تحقيق سامي السلامة)'
    },
    {
      sourceId: 'ibnashur',
      sourceNameArabic: 'تفسير ابن عاشور — التحرير والتنوير',
      sourceNameEnglish: 'Tafsir Ibn Ashur (Al-Tahrir wa al-Tanwir)',
      author: 'العلامة محمد الطاهر بن عاشور',
      methodology: 'تحقيق بلاغي ومقاصدي فائق لإعجاز النظم',
      commentaryArabic: 'حلل ابن عاشور براعة المطلع في الحمد، مبيناً أن (أل) في (الْحَمْدُ) لاستغراق جميع المحامد. وأن الانتقال من صيغة الغيبة (الحمد لله، الرحمن الرحيم، مالك يوم الدين) إلى صيغة الخطاب المباشر (إياك نعبد وإياك نستعين) هو أسلوب التفات بلاغي ينقل المصلي من مرحلة استحضار صفات الجلال إلى مرحلة الحضور بين يدي الله ومخاطبته.',
      commentaryEnglish: 'Ibn Ashur explores the rhetorical mastery of the opening, showing that the definite article in "Al-Hamd" signifies exhaustive comprehension of all laudation. The shift from third-person to direct second-person address ("You we worship") represents profound Iltifat (rhetorical apostrophe).',
      keyInsightsArabic: ['أسلوب الالتفات البلاغي يجسد الانتقال إلى مقام المشاهدة والمناجاة', 'سورة الفاتحة نموذج كامل للتناسب والترابط المعنوي المحكم'],
      keyInsightsEnglish: ['Rhetorical transition (Iltifat) reflects intimate presence with the Divine', 'Flawless structural symmetry throughout the chapter'],
      isDirectVerbatimTextAvailable: true,
      verificationNote: 'التحرير والتنوير (الدار التونسية للنشر، المجلد 1)'
    },
    {
      sourceId: 'qurtubi',
      sourceNameArabic: 'تفسير القرطبي',
      sourceNameEnglish: 'Tafsir Al-Qurtubi',
      author: 'الإمام أبو عبد الله القرطبي',
      methodology: 'فقهي لغوي جامع للأحكام والمسائل',
      commentaryArabic: 'فصّل القرطبي في أسماء السورة (الفاتحة، السبع المثاني، الشافية، الكافية، الرقية). وتناول مسألة وجوب قراءتها في الصلاة ومسألة البسملة هل هي آية منها. واستنبط أن الهداية المطلوبة نوعان: هداية دلالة وإرشاد، وهداية توفيق وتثبيت، والمؤمن يسأل التثبيت على الحق حتى الممات.',
      commentaryEnglish: 'Al-Qurtubi details the twelve traditional names of the Surah, including Al-Shafiyah (The Healing One). He analyzes the jurisprudential requirement of reciting it in prayer and categorizes divine guidance into informational guidance and existential guidance to steadfastness.',
      keyInsightsArabic: ['تسمية السورة بـ (الشافية) يربطها بالشفاء الروحي والنفسي والجسدي', 'سؤال الهداية مستمر للمؤمن لطلب الثبات والترقي في مراتب الإحسان'],
      keyInsightsEnglish: ['Designation as Al-Shafiyah highlights spiritual, psychological, and physiological healing', 'Guidance prayer seeks steadfastness and progressive ascension'],
      isDirectVerbatimTextAvailable: true,
      verificationNote: 'الجامع لأحكام القرآن (دار عالم الكتب، مجلد 1)'
    },
    {
      sourceId: 'saadi',
      sourceNameArabic: 'تفسير السعدي',
      sourceNameEnglish: 'Tafsir As-Sa\'di',
      author: 'العلامة عبد الرحمن بن ناصر السعدي',
      methodology: 'إيماني تربوي يبرز مقاصد الهداية والسلوك',
      commentaryArabic: 'أكد السعدي أن سورة الفاتحة اشتملت على أنواع التوحيد الثلاثة: توحيد الربوبية في (رب العالمين)، وتوحيد الأسماء والصفات في (الرحمن الرحيم)، وتوحيد الإلهية في (إياك نعبد). وأن الصراط المستقيم هو العلم بالحق والعمل به، ومن اختل عنده أحدهما سلك سبيل المغضوب عليهم (من علم ولم يعمل) أو الضالين (من عمل بلا علم).',
      commentaryEnglish: 'As-Sa\'di notes that Al-Fatihah encompasses all three dimensions of Monotheism. The Straight Path balances knowledge of truth with righteous implementation; deficiency in either leads to deviation.',
      keyInsightsArabic: ['توازن العلم والعمل هو صمام الأمان من الغضب والضلال', 'الاستعانة بالله ضرورة وجودية إذ لا حول للإنسان ولا قوة إلا به'],
      keyInsightsEnglish: ['Harmonizing knowledge with practice safeguards against moral decay', 'Seeking divine assistance is an existential human necessity'],
      isDirectVerbatimTextAvailable: true,
      verificationNote: 'تيسير الكريم الرحمن في تفسير كلام المنان (مؤسسة الرسالة)'
    }
  ],
  comparativeAnalysis: {
    pointsOfAgreement: [
      {
        arabic: 'إجماع المفسرين على أن السورة مكية وأعظم سور القرآن الكريم، وأنها ركن الصلاة الذي لا تصح إلا به.',
        english: 'Consensus among exegetes that Al-Fatihah is the greatest Surah, and indispensable pillar of prayer.'
      },
      {
        arabic: 'اتفاقهم على أن تقديم (إياك) يفيد الحصر اللغوي: نعبدك ولا نعبد سواك ونستعين بك ولا نستعين بغيرك.',
        english: 'Unanimous agreement that the syntactic fronting of "Iyyaka" grammaticalizes exclusive monotheism.'
      },
      {
        arabic: 'اتفاقهم على أن (المغضوب عليهم) هم من عرفوا الحق وتركوه، و(الضالين) هم من عبدوا بغير علم وبصيرة.',
        english: 'Consensus that "those who evoke anger" knew truth but discarded it, while "the astray" acted without knowledge.'
      }
    ],
    pointsOfDivergence: [
      {
        arabic: 'مسألة عد البسملة آية مستقلة من الفاتحة: الشافعية عدوها آية أولى منها، والمالكية لم يعدوها آية منها بل افتتاحاً مباركاً، والحنفية والحنابلة أثبتوا أنها آية من القرآن تُقرأ سراً.',
        english: 'Whether the Basmalah is an integral verse of Al-Fatihah: Shafi\'is consider it verse 1, Malikis view it as introductory, Hanafis and Hanbalis recite it silently.'
      },
      {
        arabic: 'نوع الهداية المسؤولة في (اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ): هل هي هداية ابتداء للمؤمنين أم هداية تثبيت وزيادة درجات وبصيرة؟ رجح المحققون أنها طلب الثبات والاستزادة.',
        english: 'Nature of guidance requested by practicing believers: whether it seeks initiation, or progressive steadfastness and illumination.'
      }
    ],
    issuesTable: [
      {
        issueArabic: 'هل البسملة آية معدودة من سورة الفاتحة؟',
        issueEnglish: 'Is the Basmalah an integral verse of Surah Al-Fatihah?',
        views: {
          'القرطبي': {
            arabic: 'روى أقوال الفقهاء ورجح مذهب الإمام مالك بأنها ليست آية من الفاتحة في الصلاة المفروضة، مع ثبوت بركتها.',
            english: 'Recorded juristic debates favoring the Maliki view that it is an opening blessing rather than numbered verse.'
          },
          'ابن كثير': {
            arabic: 'بسط الأدلة من السنن والآثار ورجح أنها آية مستقلة أنزلت للفصل بين السور وتُعد آية من الفاتحة عند الشافعي وطائفة.',
            english: 'Surveyed Hadith collections, noting the Shafi\'i position counting it as verse one.'
          },
          'ابن عاشور': {
            arabic: 'بحث المسألة تاريخياً ولغوياً وأوضح أنها كُتبت في المصاحف العثمانية في أوائل السور لحكمة التشريف والفصل.',
            english: 'Analyzed the codicological history in Uthmani manuscripts as canonical division and blessing.'
          }
        },
        classification: 'خلاصة تفسيرية'
      },
      {
        issueArabic: 'السر البلاغي للالتفات من الغيبة (الحمد لله) إلى الخطاب (إياك نعبد)',
        issueEnglish: 'Rhetorical significance of apostrophic shift (Iltifat) from 3rd to 2nd person',
        views: {
          'الزمخشري وابن عاشور': {
            arabic: 'الالتفات ينقل الذهن من مجرد العلم بالصفات إلى الحضور الوجداني التام مع الله ومخاطبته كفاحاً.',
            english: 'The syntactic transition shifts the mind from intellectual acknowledgement of divine attributes to direct, conscious devotional presence.'
          },
          'السعدي': {
            arabic: 'مناسبة الخطاب أن العبد بعدما حمد وأثنى ومجد قرُب من ربه فناسب أن يخاطبه بالعبودية والاستعانة.',
            english: 'After the worshipper praises and glorifies, they achieve spiritual proximity warranting direct address.'
          }
        },
        classification: 'تحليل لغوي أو بلاغي'
      }
    ]
  },
  linguisticAndRhetorical: {
    vocabularyRoots: [
      {
        word: 'الْحَمْدُ',
        root: 'ح-م-د',
        morphologyArabic: 'اسم مصدر معرف بأل الاستغراقية',
        morphologyEnglish: 'Verbal noun prefixed by the comprehensive definite article',
        meaningArabic: 'الثناء باللسان على الجميل الاختياري على جهة التعظيم والمحبة',
        meaningEnglish: 'Laudation and gratitude expressed with devotion, reverence and love',
        lexiconRef: 'لسان العرب (مادة: حمد)'
      },
      {
        word: 'الرَّبِّ',
        root: 'ر-ب-ب',
        morphologyArabic: 'صفة مشبهة تدل على الثبوت والكمال',
        morphologyEnglish: 'Substantive attribute signifying enduring mastery and nurturing',
        meaningArabic: 'السيد المالك المصلح المدبر المربي لخلقه بنعمه تدريجاً',
        meaningEnglish: 'The Sustainer, Sovereign, and Nurturer of creation through developmental grace',
        lexiconRef: 'المفردات في غريب القرآن للأصفهاني (مادة: ربب)'
      },
      {
        word: 'الصِّرَاطَ',
        root: 'س-ر-ط / ص-ر-ط',
        morphologyArabic: 'اسم مذكر مشتق من السَّرط وهو الابتلاع لسرعة السير فيه',
        morphologyEnglish: 'Noun derived from root implying wide, unobstructed passage',
        meaningArabic: 'الطريق الواسع الواضح المستقيم الذي لا عوج فيه ولا انحراف',
        meaningEnglish: 'The expansive, evident, straight highway free of deviation',
        lexiconRef: 'الصحاح للجوهري'
      }
    ],
    grammarAndSyntax: {
      arabic: 'بدأت السورة بجملة اسمية (الْحَمْدُ لِلَّهِ) لإفادة الثبوت والاستمرار والدوام، وعدل عن الجملة الفعلية لأن الفعل يفيد التجدد والحدوث. وتقديم المفعول في (إِيَّاكَ نَعْبُدُ) أسلوب قصر وحصر لغوي واجب لإفراد الله بالعبادة دون شريك.',
      english: 'The Surah opens with a nominal clause (Al-Hamdu Lillah) to signify permanence and enduring reality, rather than a verbal clause denoting transient renewal. Fronting the direct object in (Iyyaka Na\'budu) creates restrictive focus (Qasr), establishing monotheism.'
    },
    rhetoricalFeatures: [
      {
        categoryArabic: 'الالتفات البلاغي (Apostrophe)',
        categoryEnglish: 'Rhetorical Apostrophe (Iltifat)',
        examplePhrase: 'الْحَمْدُ لِلَّهِ ... إِيَّاكَ نَعْبُدُ',
        analysisArabic: 'الانتقال من ضمير الغائب إلى ضمير المخاطب الحاضر، وهو من أبلغ أساليب اللغة العربية في تجديد نشاط السامع وتمثيل القرب الروحي.',
        analysisEnglish: 'Transition from third-person description to second-person direct dialogue, vitalizing spiritual intimacy.',
        classification: 'تحليل لغوي أو بلاغي'
      },
      {
        categoryArabic: 'حسن التقسيم والازدواج',
        categoryEnglish: 'Symmetrical Duality',
        examplePhrase: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        analysisArabic: 'تطابق الوزنين والإيقاع بين العبادة كحق لله والاستعانة كحاجة للعبد، وتحقيق التوازن الروحي.',
        analysisEnglish: 'Phonetic balance balancing divine prerogative (worship) with human dependency (seeking help).',
        classification: 'تحليل لغوي أو بلاغي'
      }
    ]
  },
  quranicContextAndCoherence: {
    precedingConnection: {
      arabic: 'فاتحة المصحف ومفتاح القرآن؛ لذلك وُضعت في طليعة التنزيل كبراعة استهلال جامعة لكل موضوعات السور التالية.',
      english: 'Positioned at the inaugural threshold of the Mushaf as a grand overture encapsulating all subsequent themes.'
    },
    subsequentConnection: {
      arabic: 'تتصل سورة الفاتحة بسورة البقرة اتصال الإجمال بالتفصيل؛ فالدعاء في الفاتحة (اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ) يجد جوابه في أول البقرة مباشرة: (ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ).',
      english: 'Directly bridges into Al-Baqarah: the prayer in Al-Fatihah ("Guide us to the Straight Path") is answered immediately in verse 2 of Al-Baqarah ("This is the Book without doubt, guidance for the God-fearing").'
    },
    surahCentralAxis: {
      arabic: 'المحور العام لسورة الفاتحة هو إقرار العبودية التامة لله رب العالمين، وتحقيق التوازن النفسي والروحي بين الرجاء والخوف، والاستقامة على الصراط الحق.',
      english: 'The governing axis is total surrender to the Lord of Worlds, balancing hope and awe, and walking the Straight Path.'
    },
    relatedVerses: [
      {
        surahAyah: 'الحجر: 87',
        textArabic: 'وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ',
        connectionArabic: 'تسمية الفاتحة بالسبع المثاني في القرآن نفسه تكريماً لآياتها السبع المثناة في كل ركعة.',
        connectionEnglish: 'Scriptural affirmation designating Al-Fatihah as the Seven Oft-Repeated Verses.'
      }
    ]
  },
  deepReflection: {
    centralIdea: {
      arabic: 'الإنسان كائن فقير إلى ربه بالذات، لا قوام لحياته النفسية والجسدية إلا بالارتباط الحي بالخالق عبر الحمد الدائم والاستعانة المستمرة.',
      english: 'Human existence is intrinsically contingent on divine sustenance; mental, emotional, and physical equilibrium requires perpetual praise and reliance on the Creator.'
    },
    faithDimensions: [
      {
        arabic: 'استشعار معيّة الله ورعايته الشاملة لكل ذرة في الوجود (رَبِّ الْعَالَمِينَ).',
        english: 'Cultivating mindfulness of Allah\'s encompassing providence across all cosmic dimensions.'
      },
      {
        arabic: 'غرس الطمأنينة القلبية لأن الحاكم يوم الدين هو نفسه الرحمن الرحيم.',
        english: 'Instilling serene hope knowing the Sovereign of Judgment Day is the Entirely Merciful.'
      }
    ],
    moralEducationalDimensions: [
      {
        arabic: 'التربية على التحرر من التبعية للخلق؛ فمن استعان بالله وحده تحرر من الخوف من المخلوقين.',
        english: 'Liberation from psychological servitude to created beings through exclusive reliance on God.'
      },
      {
        arabic: 'ملازمة الأدب في الطلب بتقديم الثناء والاعتراف بالنعم قبل مسألة الحوائج.',
        english: 'Moral pedagogy in petition: honoring benefaction before presenting personal requests.'
      }
    ],
    humanDimensions: [
      {
        arabic: 'تأصيل الانتماء للجماعة الإنسانية والمؤمنة؛ فقد جاءت الضمائر بصيغة الجمع (نَعْبُدُ، نَسْتَعِينُ، اهْدِنَا) حتى لو كان المصلي فرداً.',
        english: 'Affirming collective human solidarity: prayers are formulated in the plural ("We worship, Guide us") even in solitary devotion.'
      }
    ],
    practicalApplications: [
      {
        arabic: 'استحضار معاني الفاتحة في الصلوات اليومية السبعة عشر المفروضة لتحويل الصلاة إلى لقاء حي ومناجاة حقيقية.',
        english: 'Actively contemplating meanings during the 17 obligatory daily recitations.'
      },
      {
        arabic: 'الاستعانة بالله في بداية كل مشروع ومهمة حياتية ونبذ الغرور بالقدرات الذاتية.',
        english: 'Commencing every life initiative with humble reliance on divine support.'
      }
    ]
  },
  quranicGuidance: [
    {
      category: 'إيمانية',
      categoryEnglish: 'Spiritual/Faith',
      guidanceArabic: 'تحقيق التوحيد الخالص بنفي الشرك في العبادة والاستعانة، واستشعار قرب الله ومناجاته.',
      guidanceEnglish: 'Realizing pure monotheism by negating idolatry in devotion and reliance.',
      scripturalBasisArabic: 'صريح قوله تعالى: ﴿ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴾',
      scripturalBasisEnglish: 'Explicit scriptural foundation in 1:5',
      classification: 'استنباط تدبري'
    },
    {
      category: 'أخلاقية',
      categoryEnglish: 'Ethical',
      guidanceArabic: 'ترسيخ فضيلة الشكر والاعتراف بالفضل لأهله، والبدء بحمد المنعم قبل كل شيء.',
      guidanceEnglish: 'Cultivating gratitude and acknowledging benevolence.',
      scripturalBasisArabic: 'صدر السورة: ﴿ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴾',
      scripturalBasisEnglish: 'Opening verse 1:2',
      classification: 'استنباط تدبري'
    },
    {
      category: 'اجتماعية',
      categoryEnglish: 'Social',
      guidanceArabic: 'تعزيز روح الأخوة ووحدة المصير الإيماني بصيغة الجمع في الدعاء والعبادة (اهدنا).',
      guidanceEnglish: 'Fostering communal solidarity through collective plural supplication.',
      scripturalBasisArabic: 'صيغة الجمع الجامعة: ﴿ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴾',
      scripturalBasisEnglish: 'Plural petition in 1:6',
      classification: 'استنباط تدبري'
    }
  ],
  hadithAndAthar: [
    {
      textArabic: 'قسمتُ الصلاةَ بيني وبينَ عبدي نصفينِ، ولعبدي ما سألَ؛ فإذا قال العبدُ: الحمدُ للهِ ربِّ العالمينَ، قال اللهُ: حَمِدَني عبدي...',
      textEnglish: 'I have divided the prayer between Myself and My servant into two halves, and My servant shall have what he asks for...',
      narratorArabic: 'أبو هريرة رضي الله عنه',
      narratorEnglish: 'Abu Hurairah (may Allah be pleased with him)',
      sourceArabic: 'صحيح مسلم (رقم 395)',
      sourceEnglish: 'Sahih Muslim (Hadith 395)',
      gradeArabic: 'صحيح متفق على أصله',
      gradeEnglish: 'Sahih',
      relevanceArabic: 'الحديث القدسي التأسيسي الذي يوضح المحاورة المباشرة بين الله وعبده في كل آية من الفاتحة.',
      relevanceEnglish: 'Foundational Hadith Qudsi illustrating the direct dialogue between Allah and the worshipper.',
      classification: 'نقل حرفي موثق'
    },
    {
      textArabic: 'ما أنزلَ اللهُ في التوراةِ ولا في الإنجيلِ مثلَ أمِّ القرآنِ، وهي السبعُ المثاني، وهي مقسومةٌ بيني وبينَ عبدي...',
      textEnglish: 'Allah has not revealed in the Torah nor in the Gospel anything like the Mother of the Quran; it is the Seven Oft-Repeated...',
      narratorArabic: 'أبي بن كعب رضي الله عنه',
      narratorEnglish: 'Ubayy ibn Ka\'b (may Allah be pleased with him)',
      sourceArabic: 'جامع الترمذي (رقم 3125) وصححه',
      sourceEnglish: 'Jami\' at-Tirmidhi (Hadith 3125)',
      gradeArabic: 'حسن صحيح',
      gradeEnglish: 'Hasan Sahih',
      relevanceArabic: 'بيان تفرد سورة الفاتحة وعظمتها على سائر الكتب السماوية السابقة.',
      relevanceEnglish: 'Demonstrating the unique supremacy of Al-Fatihah across revealed scriptures.',
      classification: 'نقل حرفي موثق'
    }
  ],
  objectivesAndValues: [
    {
      valueArabic: 'التوحيد والحرية الروحية',
      valueEnglish: 'Monotheism & Spiritual Liberation',
      manifestationArabic: 'تحرير القلب من الخوف والتعلق بغير الله من المخلوقين بالتوكل والاستعانة.',
      manifestationEnglish: 'Emancipating the heart from fear of mortals through reliance on the Divine.',
      significanceArabic: 'الأساس العقائدي الذي تنبثق منه كل قيم الكرامة الإنسانية.',
      significanceEnglish: 'The theological bedrock of human dignity.',
      indicationType: 'دلالة صريحة',
      indicationTypeEnglish: 'Explicit Indication'
    },
    {
      valueArabic: 'الاستقامة والموازنة المعرفية',
      valueEnglish: 'Moral Integrity & Cognitive Balance',
      manifestationArabic: 'تجنب التطرف والجفاء (بين الغضب والضلال) والتمسك بالصراط المستقيم الوسطي.',
      manifestationEnglish: 'Avoiding ideological extremes by treading the balanced median path.',
      significanceArabic: 'ضمان التوازن الفكري والسلوكي للأفراد والمجتمعات.',
      significanceEnglish: 'Guaranteeing cognitive and societal harmony.',
      indicationType: 'استنباط محتمل',
      indicationTypeEnglish: 'Derived Deduction'
    }
  ],
  islamicMedicineAndScience: {
    enabled: true,
    topics: ['الشفاء بالقرآن (الرقية الشرعية)', 'الأثر العصبي والنفسي للسكينة والتكرار', 'الطب النبوي وصحة الجهاز العصبي'],
    reflectionArabic: 'سُميت سورة الفاتحة في الأحاديث الصحيحة بـ (الرقية) و(الشافية)، كما في حديث أبي سعيد الخدري المتفق عليه حين رقى بها اللديغ فشُفي بإذن الله. من المنظور الطبي المعاصر، يُدرك أطباء الأشعة والعلوم العصبية أن التلاوة الخاشعة المنضبطة ذات الإيقاع المنتظم والترتيل تسهم في خفض نشاط الجهاز العصبي السمبثاوي (المسؤول عن التوتر والالتهاب) وتحفيز الجهاز العصبي الباراسمبثاوي، مما يعزز الاستقرار القلبي والمناعي ويهيئ الجسد لسرعة الاستشفاء الذاتي.',
    reflectionEnglish: 'Al-Fatihah is canonically designated in sound Hadith as Al-Ruqyah and Al-Shafiyah (The Healing), documented when companions treated a severe scorpion sting with its recitation. From a modern physiological perspective, rhythmic devotional recitation activates the parasympathetic nervous system, mitigating neuro-inflammatory stress responses.',
    scientificContextArabic: 'تظهر دراسات الرنين المغناطيسي الوظيفي (fMRI) للدماغ أن حالات الخشوع والتركيز التأملي الديني المنتظم ترتبط بزيادة النشاط في القشرة أمام الجبهية وخفض استثارة اللوزة الدماغية (Amygdala)، مما يخفف أعراض القلق والألم المزمن ويدعم التوازن الفسيولوجي للجسم.',
    scientificContextEnglish: 'Functional MRI studies show that states of deep religious contemplation and rhythmic recitation correlate with increased prefrontal activation and attenuated amygdala hyper-reactivity, fostering stress resilience.',
    disclaimerArabic: 'تنبيه طبي وأكاديمي لد. هشام الخطيب: الرقية الشرعية عبادة واستشفاء روحي ونفسي ثابت، وليست بديلاً عن التشخيص الإشعاعي والعلاج الطبي السريري، والطب الإسلامي يقوم على التكامل بين التداوي بالوحي والأخذ بالأسباب الطبية المثبتة.',
    disclaimerEnglish: 'Clinical Notice by Dr. Hisham Al-Khatib: Spiritual healing (Ruqyah) is a valid devotional practice that complements, but never replaces, rigorous clinical diagnostics and evidence-based medical treatment.',
    scientificReferences: [
      'Newberg, A. B., et al. (2010). Neuroimaging studies of religious and spiritual contemplation. Journal of Cognitive Neuroscience.',
      'Koenig, H. G. (2012). Religion, spirituality, and health: the research and clinical implications. ISRN Psychiatry.'
    ],
    classification: 'معلومة علمية تحتاج إلى مصدر مستقل'
  },
  reflectiveQuestions: [
    {
      id: 1,
      questionArabic: 'كيف يمكن أن يتحول تكرار سورة الفاتحة في الصلاة من مجرد عادة رتيبة إلى شحنة روحية متجددة يومياً؟',
      questionEnglish: 'How can the daily repetition of Al-Fatihah in prayer transform from routine into a vibrant spiritual recharging?',
      purposeArabic: 'إيقاظ الحضور الذهني والخشوع في الصلاة.',
      purposeEnglish: 'Awakening presence of mind and reverence in prayer.'
    },
    {
      id: 2,
      questionArabic: 'ما هي الأمور في حياتي اليومية التي أعتمد فيها على حولي وقوتي وأنسى حقيقة «وَإِيَّاكَ نَسْتَعِينُ»؟',
      questionEnglish: 'In what daily areas do I unconsciously rely on my own ego while neglecting "And You alone we ask for help"?',
      purposeArabic: 'محاسبة النفس على حقيقة التوكل العملي.',
      purposeEnglish: 'Auditing personal reliance and surrender to God.'
    },
    {
      id: 3,
      questionArabic: 'كيف أوازن في مسيرتي الحياتية بين اكتساب المعرفة الصادقة والتطبيق العملي لتجنب سبل الانحراف؟',
      questionEnglish: 'How do I maintain equilibrium between acquiring genuine knowledge and ethical practice to avoid deviation?',
      purposeArabic: 'تحقيق الاستقامة المتوازنة على الصراط المستقيم.',
      purposeEnglish: 'Sustaining balanced moral integrity on the Straight Path.'
    }
  ],
  references: [
    {
      id: 1,
      citationKey: '[1]',
      authorArabic: 'الحافظ ابن كثير',
      authorEnglish: 'Ibn Kathir',
      bookTitleArabic: 'تفسير القرآن العظيم',
      bookTitleEnglish: 'Tafsir al-Qur\'an al-\'Azim',
      volumePage: 'المجلد 1، ص 101 - 145',
      surahAyahContext: 'سورة الفاتحة، الآيات 1-7',
      digitalUrl: 'https://quran.ksu.edu.sa/tafseer/katheer/sura1-aya1.html',
      isDirectlyConsulted: true,
      verificationStatusArabic: 'تم التحقق من المصدر',
      verificationStatusEnglish: 'Verified Source',
      categoryArabic: 'تفسير'
    },
    {
      id: 2,
      citationKey: '[2]',
      authorArabic: 'الإمام القرطبي',
      authorEnglish: 'Al-Qurtubi',
      bookTitleArabic: 'الجامع لأحكام القرآن',
      bookTitleEnglish: 'Al-Jami\' li-Ahkam al-Qur\'an',
      volumePage: 'المجلد 1، ص 147 - 230',
      surahAyahContext: 'سورة الفاتحة، دراسة الأحكام الفقهية والقراءات',
      digitalUrl: 'https://quran.ksu.edu.sa/tafseer/qortobi/sura1-aya1.html',
      isDirectlyConsulted: true,
      verificationStatusArabic: 'تم التحقق من المصدر',
      verificationStatusEnglish: 'Verified Source',
      categoryArabic: 'تفسير'
    },
    {
      id: 3,
      citationKey: '[3]',
      authorArabic: 'العلامة محمد الطاهر بن عاشور',
      authorEnglish: 'Ibn Ashur',
      bookTitleArabic: 'التحرير والتنوير',
      bookTitleEnglish: 'Al-Tahrir wa al-Tanwir',
      volumePage: 'المجلد 1، ص 131 - 200',
      surahAyahContext: 'سورة الفاتحة، أسرار البلاغة وإعجاز النظم',
      digitalUrl: '',
      isDirectlyConsulted: true,
      verificationStatusArabic: 'تم التحقق من المصدر',
      verificationStatusEnglish: 'Verified Source',
      categoryArabic: 'لغة وبلاغة'
    },
    {
      id: 4,
      citationKey: '[4]',
      authorArabic: 'الإمام مسلم بن الحجاج',
      authorEnglish: 'Imam Muslim',
      bookTitleArabic: 'صحيح مسلم',
      bookTitleEnglish: 'Sahih Muslim',
      volumePage: 'كتاب الصلاة، باب وجوب قراءة الفاتحة، رقم 395',
      surahAyahContext: 'حديث قسمة الصلاة',
      digitalUrl: '',
      isDirectlyConsulted: true,
      verificationStatusArabic: 'تم التحقق من المصدر',
      verificationStatusEnglish: 'Verified Source',
      categoryArabic: 'حديث وأثر'
    },
    {
      id: 5,
      citationKey: '[5]',
      authorArabic: 'ابن منظور',
      authorEnglish: 'Ibn Manzur',
      bookTitleArabic: 'لسان العرب',
      bookTitleEnglish: 'Lisan al-\'Arab',
      volumePage: 'مواد: ح-م-د، ر-ب-ب، ص-ر-ط',
      surahAyahContext: 'الجذور اللغوية لمفردات الفاتحة',
      digitalUrl: '',
      isDirectlyConsulted: true,
      verificationStatusArabic: 'تم التحقق من المصدر',
      verificationStatusEnglish: 'Verified Source',
      categoryArabic: 'لغة وبلاغة'
    },
    {
      id: 6,
      citationKey: '[6]',
      authorArabic: 'Newberg, A. B., et al.',
      authorEnglish: 'Newberg, A. B., et al.',
      bookTitleArabic: 'الدراسات العصبية الإشعاعية للتأمل والسكينة الروحية',
      bookTitleEnglish: 'Neuroimaging studies of religious and spiritual contemplation',
      volumePage: 'Journal of Cognitive Neuroscience, 2010',
      surahAyahContext: 'الأثر الفسيولوجي العصبي للاستقرار الروحي',
      digitalUrl: '',
      isDirectlyConsulted: true,
      verificationStatusArabic: 'مرجع مقترح للمراجعة والاستزادة',
      verificationStatusEnglish: 'Recommended Reference for Further Reading',
      categoryArabic: 'علوم وطب'
    }
  ]
};
