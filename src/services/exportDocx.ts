import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  Footer,
  PageNumber,
  Packer,
  BorderStyle
} from 'docx';
import { StudyContent } from '../types/quran';

export async function generateDocx(study: StudyContent, exportLang: 'ar' | 'en' | 'bilingual' = 'ar'): Promise<Blob> {
  const isAr = exportLang === 'ar' || exportLang === 'bilingual';
  const isEn = exportLang === 'en' || exportLang === 'bilingual';

  const docChildren: (Paragraph | Table)[] = [];

  // Title paragraph
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      bidirectional: true,
      spacing: { after: 200, before: 200 },
      children: [
        new TextRun({
          text: isAr ? study.metadata.studyTitleArabic : study.metadata.studyTitleEnglish,
          bold: true,
          size: 36, // 18pt
          font: 'Cairo',
          color: '0D3829'
        })
      ]
    })
  );

  if (exportLang === 'bilingual') {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: study.metadata.studyTitleEnglish,
            size: 26,
            font: 'Plus Jakarta Sans',
            color: '555555',
            italics: true
          })
        ]
      })
    );
  }

  // Metadata Banner (Surah, Ayahs, Date)
  const metaText = isAr
    ? `السورة: ${study.metadata.surahNameArabic} (${study.metadata.surahNumber}) | الآيات: ${study.metadata.startAyah} - ${study.metadata.endAyah} | تاريخ الدراسة: ${new Date(study.metadata.createdAt).toLocaleDateString('ar-EG')}`
    : `Surah: ${study.metadata.surahNameEnglish} (#${study.metadata.surahNumber}) | Verses: ${study.metadata.startAyah} - ${study.metadata.endAyah} | Date: ${new Date(study.metadata.createdAt).toLocaleDateString('en-US')}`;

  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      bidirectional: true,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: metaText,
          size: 22,
          font: 'Amiri',
          color: '333333'
        })
      ]
    })
  );

  // Section 1: Quranic Text
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: true,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: isAr ? 'أ. النص القرآني الموثق' : 'A. Verified Quranic Text',
          bold: true,
          size: 28,
          color: '0D3829'
        })
      ]
    })
  );

  for (const v of study.verses) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        bidirectional: true,
        spacing: { before: 100, after: 100 },
        children: [
          new TextRun({
            text: `﴿ ${v.textArabic} ﴾ [${study.metadata.surahNameArabic}: ${v.numberInSurah}]`,
            bold: true,
            size: 26,
            font: 'Amiri Quran',
            color: '0D3829'
          })
        ]
      })
    );
    if (isEn && v.textEnglish) {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: `"${v.textEnglish}" [${study.metadata.surahNameEnglish}: ${v.numberInSurah}]`,
              size: 22,
              font: 'Plus Jakarta Sans',
              italics: true,
              color: '444444'
            })
          ]
        })
      );
    }
  }

  // Section 2: General Meaning
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: true,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: isAr ? 'ب. المعنى الإجمالي والسياق' : 'B. Overall Meaning & Context',
          bold: true,
          size: 28,
          color: '0D3829'
        })
      ]
    })
  );

  if (isAr) {
    docChildren.push(
      new Paragraph({
        bidirectional: true,
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: study.generalMeaning.arabic,
            size: 24,
            font: 'Amiri'
          })
        ]
      })
    );
  }
  if (isEn) {
    docChildren.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: study.generalMeaning.english,
            size: 22,
            font: 'Plus Jakarta Sans'
          })
        ]
      })
    );
  }

  // Section 3: Tafsir Sources
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: true,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: isAr ? 'ج. التفسير من المصادر المعتمدة' : 'C. Tafsir from Accredited Classical Sources',
          bold: true,
          size: 28,
          color: '0D3829'
        })
      ]
    })
  );

  for (const t of study.tafsirCards) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        bidirectional: true,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: isAr ? `${t.sourceNameArabic} (${t.author})` : `${t.sourceNameEnglish} (${t.author})`,
            bold: true,
            size: 24,
            color: '854D0E' // Amber 800
          })
        ]
      })
    );

    if (isAr) {
      docChildren.push(
        new Paragraph({
          bidirectional: true,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: t.commentaryArabic,
              size: 24,
              font: 'Amiri'
            })
          ]
        })
      );
    }
    if (isEn && t.commentaryEnglish) {
      docChildren.push(
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: t.commentaryEnglish,
              size: 22,
              font: 'Plus Jakarta Sans'
            })
          ]
        })
      );
    }
  }

  // Section 4: Comparative Analysis
  if (study.comparativeAnalysis && study.comparativeAnalysis.issuesTable.length > 0) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        bidirectional: true,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: isAr ? 'د. المقارنة بين المفسرين' : 'D. Comparative Analysis of Exegetes',
            bold: true,
            size: 28,
            color: '0D3829'
          })
        ]
      })
    );

    const tableRows: TableRow[] = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                bidirectional: true,
                children: [new TextRun({ text: isAr ? 'المسألة التفسيرية' : 'Exegetical Issue', bold: true, size: 22 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                bidirectional: true,
                children: [new TextRun({ text: isAr ? 'أقوال وتوجيهات المفسرين' : 'Exegetical Views & Arguments', bold: true, size: 22 })]
              })
            ]
          })
        ]
      })
    ];

    for (const row of study.comparativeAnalysis.issuesTable) {
      const viewsJoined = Object.entries(row.views)
        .map(([k, v]) => `${k}: ${isAr ? v.arabic : v.english}`)
        .join('\n\n');

      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  bidirectional: true,
                  children: [new TextRun({ text: isAr ? row.issueArabic : row.issueEnglish, bold: true, size: 22 })]
                })
              ]
            }),
            new TableCell({
              children: [
                new Paragraph({
                  bidirectional: true,
                  children: [new TextRun({ text: viewsJoined, size: 22 })]
                })
              ]
            })
          ]
        })
      );
    }

    docChildren.push(
      new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE }
      })
    );
  }

  // Section 5: Linguistic and Rhetorical
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: true,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: isAr ? 'هـ. التحليل اللغوي والبلاغي' : 'E. Linguistic & Rhetorical Analysis',
          bold: true,
          size: 28,
          color: '0D3829'
        })
      ]
    })
  );

  for (const root of study.linguisticAndRhetorical.vocabularyRoots) {
    docChildren.push(
      new Paragraph({
        bidirectional: true,
        spacing: { after: 100 },
        children: [
          new TextRun({ text: `• ${root.word} `, bold: true, size: 24 }),
          new TextRun({ text: `(الجذر: ${root.root}) - `, italics: true, size: 22 }),
          new TextRun({ text: isAr ? root.meaningArabic : root.meaningEnglish, size: 22 }),
          new TextRun({ text: ` [مرجع: ${root.lexiconRef}]`, color: '666666', size: 20 })
        ]
      })
    );
  }

  // Section 6: Deep Reflection
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: true,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: isAr ? 'ز. التدبر العميق والهدايات' : 'F. Deep Spiritual Reflection & Guidance',
          bold: true,
          size: 28,
          color: '0D3829'
        })
      ]
    })
  );

  docChildren.push(
    new Paragraph({
      bidirectional: true,
      spacing: { after: 150 },
      children: [
        new TextRun({ text: isAr ? 'الفكرة المركزية: ' : 'Central Theme: ', bold: true, size: 24 }),
        new TextRun({ text: isAr ? study.deepReflection.centralIdea.arabic : study.deepReflection.centralIdea.english, size: 24 })
      ]
    })
  );

  // Section 7: Islamic Medicine & Science (if enabled)
  if (study.islamicMedicineAndScience && study.islamicMedicineAndScience.enabled) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        bidirectional: true,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: isAr ? 'ك. القرآن والإنسان والصحة والطب الإسلامي' : 'G. Quran, Humanity, Health & Islamic Medicine',
            bold: true,
            size: 28,
            color: '0D3829'
          })
        ]
      })
    );

    docChildren.push(
      new Paragraph({
        bidirectional: true,
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: isAr ? study.islamicMedicineAndScience.reflectionArabic : study.islamicMedicineAndScience.reflectionEnglish,
            size: 24
          })
        ]
      })
    );

    docChildren.push(
      new Paragraph({
        bidirectional: true,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: isAr ? study.islamicMedicineAndScience.disclaimerArabic : study.islamicMedicineAndScience.disclaimerEnglish,
            italics: true,
            size: 20,
            color: '666666'
          })
        ]
      })
    );
  }

  // Section 8: References and Sources
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: true,
      spacing: { before: 400, after: 150 },
      children: [
        new TextRun({
          text: isAr ? 'المراجع والمصادر العلمية الموثقة' : 'Verified Scholarly References & Bibliography',
          bold: true,
          size: 28,
          color: '0D3829'
        })
      ]
    })
  );

  for (const ref of study.references) {
    const refStr = isAr
      ? `${ref.citationKey} ${ref.authorArabic} — ${ref.bookTitleArabic}. ${ref.volumePage ? `(${ref.volumePage})` : ''}. [${ref.verificationStatusArabic}]`
      : `${ref.citationKey} ${ref.authorEnglish} — ${ref.bookTitleEnglish}. ${ref.volumePage ? `(${ref.volumePage})` : ''}. [${ref.verificationStatusEnglish}]`;

    docChildren.push(
      new Paragraph({
        bidirectional: true,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: refStr,
            size: 22,
            font: 'Amiri'
          })
        ]
      })
    );
  }

  // Footer with Dr. Hisham Al-Khatib credentials
  const footerText = `د. هشام الخطيب | استشاري الأشعة التشخيصية | مهتم بالطب الإسلامي
Dr. Hisham Al-Khatib | Consultant Diagnostic Radiologist | Interested in Islamic Medicine`;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            pageNumbers: {
              start: 1
            }
          }
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                children: [
                  new TextRun({
                    text: footerText,
                    size: 18,
                    color: '555555',
                    font: 'Amiri'
                  }),
                  new TextRun({
                    text: ' — صفحة ',
                    size: 18,
                    color: '777777'
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    bold: true
                  })
                ]
              })
            ]
          })
        },
        children: docChildren
      }
    ]
  });

  return await Packer.toBlob(doc);
}
