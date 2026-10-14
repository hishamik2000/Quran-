import { AyahText } from '../types/quran';
import { SURAHS_METADATA } from '../data/quranMetadata';

// Normalize Arabic text by removing Tashkeel and unifying letter variations
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    // Remove Tashkeel (harakat)
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    // Normalize Alef variations
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Yaa
    .replace(/[ىي]/g, 'ي')
    // Normalize spaces and tatweel
    .replace(/ـ/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Built-in verified seed verses for instant offline availability & fallback
const VERIFIED_SEEDS: Record<string, { ar: string; en: string }> = {
  // Surah 1 (Al-Fatihah)
  '1:1': { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
  '1:2': { ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', en: '[All] praise is [due] to Allah, Lord of the worlds -' },
  '1:3': { ar: 'الرَّحْمَٰنِ الرَّحِيمِ', en: 'The Entirely Merciful, the Especially Merciful,' },
  '1:4': { ar: 'مَالِكِ يَوْمِ الدِّينِ', en: 'Sovereign of the Day of Recompense.' },
  '1:5': { ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', en: 'It is You we worship and You we ask for help.' },
  '1:6': { ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', en: 'Guide us to the straight path -' },
  '1:7': { ar: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', en: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.' },

  // Surah 2:255 (Ayat al-Kursi)
  '2:255': {
    ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.'
  },

  // Surah 2:285-286 (Khawatim Al-Baqarah)
  '2:285': {
    ar: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
    en: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination."'
  },
  '2:286': {
    ar: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    en: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it gained, and it will bear [the consequence of] what [evil] it earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."'
  },

  // Surah 49:13 (Al-Hujurat)
  '49:13': {
    ar: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
    en: 'O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allah is the most righteous of you. Indeed, Allah is Knowing and Acquainted.'
  },

  // Surah 112 (Al-Ikhlas)
  '112:1': { ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ', en: 'Say, "He is Allah, [who is] One,' },
  '112:2': { ar: 'اللَّهُ الصَّمَدُ', en: 'Allah, the Eternal Refuge.' },
  '112:3': { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', en: 'He neither begets nor is born,' },
  '112:4': { ar: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', en: 'Nor is there to Him any equivalent."' },

  // Surah 113 (Al-Falaq)
  '113:1': { ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', en: 'Say, "I seek refuge in the Lord of daybreak' },
  '113:2': { ar: 'مِن شَرِّ مَا خَلَقَ', en: 'From the evil of that which He created' },
  '113:3': { ar: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', en: 'And from the evil of darkness when it settles' },
  '113:4': { ar: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', en: 'And from the evil of the blowers in knots' },
  '113:5': { ar: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', en: 'And from the evil of an envier when he envies."' },

  // Surah 114 (An-Nas)
  '114:1': { ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', en: 'Say, "I seek refuge in the Lord of mankind,' },
  '114:2': { ar: 'مَلِكِ النَّاسِ', en: 'The Sovereign of mankind,' },
  '114:3': { ar: 'إِلَٰهِ النَّاسِ', en: 'The God of mankind,' },
  '114:4': { ar: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', en: 'From the evil of the retreating whisperer -' },
  '114:5': { ar: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', en: 'Who whispers [evil] into the breasts of mankind -' },
  '114:6': { ar: 'مِنَ الْجِنَّةِ وَالنَّاسِ', en: 'From among the jinn and mankind."' }
};

export async function fetchAyah(surahNumber: number, ayahNumber: number): Promise<AyahText> {
  const surah = SURAHS_METADATA.find(s => s.number === surahNumber);
  const surahNameArabic = surah ? surah.nameArabic : `سورة ${surahNumber}`;
  const surahNameEnglish = surah ? surah.nameEnglish : `Surah ${surahNumber}`;
  const key = `${surahNumber}:${ayahNumber}`;

  // Check seed cache first
  if (VERIFIED_SEEDS[key]) {
    return {
      surahNumber,
      surahNameArabic,
      surahNameEnglish,
      numberInSurah: ayahNumber,
      numberInQuran: 0,
      textArabic: VERIFIED_SEEDS[key].ar,
      textEnglish: VERIFIED_SEEDS[key].en,
      juz: surah?.juz[0] || 1
    };
  }

  // Try server proxy endpoint first (safe against browser CORS / sandbox network blocks)
  try {
    const proxyRes = await fetch(`/api/quran/ayah/${surahNumber}/${ayahNumber}`);
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data && data.textArabic) {
        const ayahObj: AyahText = {
          surahNumber,
          surahNameArabic,
          surahNameEnglish,
          numberInSurah: ayahNumber,
          numberInQuran: data.numberInQuran || 0,
          textArabic: data.textArabic,
          textEnglish: data.textEnglish,
          juz: surah?.juz[0] || 1
        };
        VERIFIED_SEEDS[key] = { ar: data.textArabic, en: data.textEnglish };
        return ayahObj;
      }
    }
  } catch (proxyErr) {
    // Continue to external fetch
  }

  // Fetch from Al-Quran Cloud API (Uthmani Arabic text + Sahih International English translation)
  try {
    const [arRes, enRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/quran-uthmani`),
      fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/en.sahih`)
    ]);

    if (arRes.ok && enRes.ok) {
      const arData = await arRes.json();
      const enData = await enRes.json();

      if (arData.status === 'OK' && enData.status === 'OK') {
        const ar = arData.data.text;
        const en = enData.data.text;
        const ayahObj: AyahText = {
          surahNumber,
          surahNameArabic: arData.data.surah.name,
          surahNameEnglish: arData.data.surah.englishName,
          numberInSurah: ayahNumber,
          numberInQuran: arData.data.number,
          textArabic: ar,
          textEnglish: en,
          juz: arData.data.juz
        };
        // Cache in memory
        VERIFIED_SEEDS[key] = { ar, en };
        return ayahObj;
      }
    }
  } catch (err) {
    console.warn(`[Quran API] Live fetch error for ${key}, falling back to placeholder`, err);
  }

  // Graceful fallback
  return {
    surahNumber,
    surahNameArabic,
    surahNameEnglish,
    numberInSurah: ayahNumber,
    numberInQuran: 0,
    textArabic: `سورة ${surahNameArabic} - الآية ${ayahNumber}`,
    textEnglish: `Surah ${surahNameEnglish} - Ayah ${ayahNumber}`,
    juz: surah?.juz[0] || 1
  };
}

export async function fetchAyahRange(surahNumber: number, startAyah: number, endAyah: number): Promise<AyahText[]> {
  const promises: Promise<AyahText>[] = [];
  for (let a = startAyah; a <= endAyah; a++) {
    promises.push(fetchAyah(surahNumber, a));
  }
  return Promise.all(promises);
}

// Search Quran text by word or phrase
export async function searchQuranByPhrase(query: string): Promise<{ surahNumber: number; ayahNumber: number; textArabic: string }[]> {
  const normalizedQuery = normalizeArabicText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  // First check seeds
  const localMatches: { surahNumber: number; ayahNumber: number; textArabic: string }[] = [];
  for (const [key, val] of Object.entries(VERIFIED_SEEDS)) {
    if (normalizeArabicText(val.ar).includes(normalizedQuery)) {
      const [s, a] = key.split(':').map(Number);
      localMatches.push({ surahNumber: s, ayahNumber: a, textArabic: val.ar });
    }
  }

  // First query local server search endpoint
  try {
    const proxyRes = await fetch(`/api/quran/search?q=${encodeURIComponent(query)}`);
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (Array.isArray(data.matches) && data.matches.length > 0) {
        return data.matches;
      }
    }
  } catch (proxyErr) {
    // Continue to external search or seed check
  }

  // Also query live search if available
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/quran-simple`);
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'OK' && Array.isArray(data.data?.matches)) {
        const results = data.data.matches.slice(0, 15).map((m: any) => ({
          surahNumber: m.surah.number,
          ayahNumber: m.numberInSurah,
          textArabic: m.text
        }));
        // Merge without duplicates
        const seen = new Set(localMatches.map(m => `${m.surahNumber}:${m.ayahNumber}`));
        for (const r of results) {
          const k = `${r.surahNumber}:${r.ayahNumber}`;
          if (!seen.has(k)) {
            seen.add(k);
            localMatches.push(r);
          }
        }
      }
    }
  } catch (e) {
    // Return local matches if offline
  }

  return localMatches;
}

// Verify manual text entry against authentic Quran
export async function verifyManualQuranText(rawInput: string): Promise<{
  isValid: boolean;
  match?: {
    surahNumber: number;
    surahNameArabic: string;
    ayahNumber: number;
    authenticTextArabic: string;
    authenticTextEnglish: string;
    similarity: number;
  };
  messageArabic: string;
  messageEnglish: string;
}> {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      isValid: false,
      messageArabic: 'يرجى إدخال نص الآية المراد التحقق منها.',
      messageEnglish: 'Please enter the verse text to verify.'
    };
  }

  const normalizedInput = normalizeArabicText(trimmed);

  // Check seeds first
  for (const [key, val] of Object.entries(VERIFIED_SEEDS)) {
    const normSeed = normalizeArabicText(val.ar);
    if (normSeed.includes(normalizedInput) || normalizedInput.includes(normSeed)) {
      const [s, a] = key.split(':').map(Number);
      const surah = SURAHS_METADATA.find(sm => sm.number === s);
      return {
        isValid: true,
        match: {
          surahNumber: s,
          surahNameArabic: surah?.nameArabic || `سورة ${s}`,
          ayahNumber: a,
          authenticTextArabic: val.ar,
          authenticTextEnglish: val.en,
          similarity: 1.0
        },
        messageArabic: 'تم التحقق من النص ومطابقته بنجاح مع المصحف الشريف.',
        messageEnglish: 'Verse text successfully verified against the verified Quran text.'
      };
    }
  }

  // Try searching live Quran API
  try {
    const searchRes = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(normalizedInput.slice(0, 50))}/all/quran-simple`);
    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.status === 'OK' && data.data?.matches?.length > 0) {
        const top = data.data.matches[0];
        const fullAyah = await fetchAyah(top.surah.number, top.numberInSurah);
        return {
          isValid: true,
          match: {
            surahNumber: top.surah.number,
            surahNameArabic: top.surah.name,
            ayahNumber: top.numberInSurah,
            authenticTextArabic: fullAyah.textArabic,
            authenticTextEnglish: fullAyah.textEnglish,
            similarity: 0.95
          },
          messageArabic: `تم العثور على الآية والتحقق منها في سورة ${top.surah.name} الآية ${top.numberInSurah}.`,
          messageEnglish: `Verse verified in Surah ${top.surah.englishName} Ayah ${top.numberInSurah}.`
        };
      }
    }
  } catch (e) {
    // fallback below
  }

  return {
    isValid: false,
    messageArabic: 'تعذر مطابقة النص بدقة مع آيات القرآن الكريم. يرجى مراجعة الرسم الإملائي أو اختيار السورة ورقم الآية من القائمة.',
    messageEnglish: 'Could not reliably match this text to an authentic Quranic verse. Please check spelling or select Surah and Ayah from the menu.'
  };
}
