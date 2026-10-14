import { StudyContent } from '../types/quran';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  language: 'ar' | 'en' | 'bilingual';
  scopeMode: 'full' | 'summary' | 'selected';
  includeQuranText: boolean;
  includeComparativeTable: boolean;
  includeLinguistic: boolean;
  includeReflection: boolean;
  includeGuidance: boolean;
  includeHadith: boolean;
  includeIslamicMedicine: boolean;
  includeReferences: boolean;
  paperSize: 'A4';
  includePageNumbers: boolean;
}

export function generatePrintableHtml(study: StudyContent, options: PdfExportOptions): string {
  const isAr = options.language === 'ar' || options.language === 'bilingual';
  const isEn = options.language === 'en' || options.language === 'bilingual';
  const isBilingual = options.language === 'bilingual';
  const dir = isAr ? 'rtl' : 'ltr';

  const dateStr = new Date(study.metadata.createdAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="${isAr ? 'ar' : 'en'}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <title>${isAr ? study.metadata.studyTitleArabic : study.metadata.studyTitleEnglish}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm 15mm 15mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: ${isAr ? "'Amiri', 'Cairo', serif" : "'Plus Jakarta Sans', sans-serif"};
      color: #1e293b;
      background: #ffffff;
      line-height: 1.7;
      font-size: 11pt;
      direction: ${dir};
      text-align: ${isAr ? 'right' : 'left'};
    }
    .container {
      max-width: 100%;
      margin: 0 auto;
    }
    .study-header {
      text-align: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
    }
    .study-title {
      font-family: 'Cairo', sans-serif;
      font-size: 16pt;
      font-weight: 700;
      color: #0d3829;
      margin: 0 0 4px 0;
      line-height: 1.4;
    }
    .study-subtitle {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10.5pt;
      color: #64748b;
      font-style: italic;
      margin: 0 0 6px 0;
    }
    .study-meta-strip {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 9.5pt;
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    h2.section-heading {
      font-family: 'Cairo', sans-serif;
      font-size: 13pt;
      font-weight: 700;
      color: #0d3829;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }
    .quran-box {
      background: #fdfbf7;
      border: 1px solid #e2d9c8;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 16px;
      text-align: center;
      page-break-inside: avoid;
    }
    .quran-ayah {
      font-family: 'Amiri Quran', 'Amiri', serif;
      font-size: 15pt;
      color: #064e3b;
      line-height: 2.2;
      margin-bottom: 8px;
    }
    .quran-trans {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10pt;
      font-style: italic;
      color: #475569;
      line-height: 1.6;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .card-title {
      font-family: 'Cairo', sans-serif;
      font-weight: 700;
      font-size: 11pt;
      color: #854d0e;
      margin-bottom: 6px;
    }
    .table-container {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }
    .table-container th, .table-container td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      vertical-align: top;
      text-align: ${isAr ? 'right' : 'left'};
    }
    .table-container th {
      background: #f1f5f9;
      font-family: 'Cairo', sans-serif;
      font-weight: 600;
      color: #0f172a;
    }
    .badge {
      display: inline-block;
      font-size: 8pt;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      background: #f1f5f9;
      color: #475569;
      margin-inline-start: 6px;
    }
    .bilingual-pair {
      margin-bottom: 10px;
    }
    .bilingual-ar {
      font-family: 'Amiri', serif;
      font-size: 11pt;
      color: #1e293b;
      direction: rtl;
      text-align: right;
    }
    .bilingual-en {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10pt;
      color: #475569;
      direction: ltr;
      text-align: left;
      margin-top: 2px;
    }
    .reference-item {
      font-size: 9.5pt;
      margin-bottom: 6px;
      line-height: 1.5;
    }
    .footer-doc {
      margin-top: 30px;
      border-top: 1px solid #cbd5e1;
      padding-top: 10px;
      text-align: center;
      font-size: 9pt;
      color: #64748b;
      page-break-inside: avoid;
    }
    @media print {
      body {
        background: transparent;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Study Title Header (No Logo or App Banner) -->
    <div class="study-header">
      <h1 class="study-title">${isAr ? study.metadata.studyTitleArabic : study.metadata.studyTitleEnglish}</h1>
      ${isBilingual ? `<div class="study-subtitle">${study.metadata.studyTitleEnglish}</div>` : ''}
    </div>

    <!-- Metadata Strip -->
    <div class="study-meta-strip">
      <div>
        <strong>${isAr ? 'السورة:' : 'Surah:'}</strong> ${isAr ? study.metadata.surahNameArabic : study.metadata.surahNameEnglish} (#${study.metadata.surahNumber})
        &nbsp;|&nbsp;
        <strong>${isAr ? 'الآيات:' : 'Ayahs:'}</strong> ${study.metadata.startAyah} - ${study.metadata.endAyah}
      </div>
      <div>
        <strong>${isAr ? 'تاريخ التقرير:' : 'Date:'}</strong> ${dateStr}
      </div>
    </div>

    <!-- Section A: Quranic Text -->
    ${options.includeQuranText ? `
      <h2 class="section-heading">${isAr ? 'أ. النص القرآني الموثق' : 'A. Verified Quranic Text'}</h2>
      <div class="quran-box">
        ${study.verses.map(v => `
          <div class="quran-ayah">
            ﴿ ${v.textArabic} ﴾ [${study.metadata.surahNameArabic}: ${v.numberInSurah}]
          </div>
          ${(isEn || isBilingual) && v.textEnglish ? `
            <div class="quran-trans">
              "${v.textEnglish}" [${study.metadata.surahNameEnglish}: ${v.numberInSurah}]
            </div>
          ` : ''}
        `).join('')}
      </div>
    ` : ''}

    <!-- Section B: General Meaning -->
    <h2 class="section-heading">${isAr ? 'ب. المعنى الإجمالي والسياق' : 'B. Overall Meaning & Context'}</h2>
    <div class="bilingual-pair">
      ${isAr ? `<div class="bilingual-ar">${study.generalMeaning.arabic}</div>` : ''}
      ${isEn ? `<div class="bilingual-en">${study.generalMeaning.english}</div>` : ''}
    </div>

    <!-- Section C: Tafsir Sources -->
    <h2 class="section-heading">${isAr ? 'ج. التفسير من المصادر المعتمدة' : 'C. Tafsir from Accredited Sources'}</h2>
    ${study.tafsirCards.map(t => `
      <div class="card">
        <div class="card-title">
          ${isAr ? t.sourceNameArabic : t.sourceNameEnglish} — <span style="font-weight: normal; color: #475569;">${t.author}</span>
        </div>
        ${isAr ? `<div class="bilingual-ar" style="margin-bottom: 6px;">${t.commentaryArabic}</div>` : ''}
        ${isEn && t.commentaryEnglish ? `<div class="bilingual-en">${t.commentaryEnglish}</div>` : ''}
      </div>
    `).join('')}

    <!-- Section D: Comparative Analysis (if included) -->
    ${options.includeComparativeTable && study.comparativeAnalysis && study.comparativeAnalysis.issuesTable?.length > 0 ? `
      <h2 class="section-heading">${isAr ? 'د. المقارنة بين المفسرين' : 'D. Comparative Analysis'}</h2>
      <table class="table-container">
        <thead>
          <tr>
            <th style="width: 32%;">${isAr ? 'المسألة التفسيرية' : 'Exegetical Issue'}</th>
            <th style="width: 68%;">${isAr ? 'أقوال وتوجيهات المفسرين' : 'Exegetical Opinions'}</th>
          </tr>
        </thead>
        <tbody>
          ${study.comparativeAnalysis.issuesTable.map(row => `
            <tr>
              <td>
                <strong>${isAr ? row.issueArabic : row.issueEnglish}</strong>
                <div class="badge">${row.classification}</div>
              </td>
              <td>
                ${Object.entries(row.views).map(([src, v]) => `
                  <div style="margin-bottom: 4px;">
                    <strong style="color: #0d3829;">${src}:</strong>
                    ${isAr ? v.arabic : v.english}
                  </div>
                `).join('')}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}

    <!-- Section E: Linguistic & Rhetorical -->
    ${options.includeLinguistic ? `
      <h2 class="section-heading">${isAr ? 'هـ. التحليل اللغوي والبلاغي' : 'E. Linguistic & Rhetorical Analysis'}</h2>
      <div style="margin-bottom: 12px;">
        ${study.linguisticAndRhetorical.vocabularyRoots.map(r => `
          <div style="margin-bottom: 6px;">
            <strong>${r.word}</strong> (الجذر: ${r.root}) —
            ${isAr ? r.meaningArabic : r.meaningEnglish}
            <span style="color: #64748b; font-size: 8.5pt;">[${r.lexiconRef}]</span>
          </div>
        `).join('')}
      </div>
      <div class="bilingual-pair">
        ${isAr ? `<div class="bilingual-ar"><strong>البلاغة والأسلوب:</strong> ${study.linguisticAndRhetorical.grammarAndSyntax.arabic}</div>` : ''}
        ${isEn ? `<div class="bilingual-en"><strong>Grammar & Rhetoric:</strong> ${study.linguisticAndRhetorical.grammarAndSyntax.english}</div>` : ''}
      </div>
    ` : ''}

    <!-- Section F: Deep Reflection -->
    ${options.includeReflection ? `
      <h2 class="section-heading">${isAr ? 'ز. التدبر العميق والهدايات' : 'F. Deep Reflection & Guidance'}</h2>
      <div class="bilingual-pair" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #0d3829;">${isAr ? 'الفكرة المركزية:' : 'Central Theme:'}</div>
        ${isAr ? `<div class="bilingual-ar">${study.deepReflection.centralIdea.arabic}</div>` : ''}
        ${isEn ? `<div class="bilingual-en">${study.deepReflection.centralIdea.english}</div>` : ''}
      </div>
    ` : ''}

    <!-- Section G: Islamic Medicine & Health (if enabled and included) -->
    ${options.includeIslamicMedicine && study.islamicMedicineAndScience && study.islamicMedicineAndScience.enabled ? `
      <h2 class="section-heading">${isAr ? 'ك. القرآن والإنسان والصحة والطب الإسلامي' : 'G. Quran, Health & Islamic Medicine'}</h2>
      <div class="card" style="background: #fdfbf7; border-color: #d97706;">
        <div class="bilingual-pair">
          ${isAr ? `<div class="bilingual-ar">${study.islamicMedicineAndScience.reflectionArabic}</div>` : ''}
          ${isEn ? `<div class="bilingual-en">${study.islamicMedicineAndScience.reflectionEnglish}</div>` : ''}
        </div>
        <div style="font-size: 8.5pt; color: #64748b; font-style: italic; margin-top: 8px;">
          ${isAr ? study.islamicMedicineAndScience.disclaimerArabic : study.islamicMedicineAndScience.disclaimerEnglish}
        </div>
      </div>
    ` : ''}

    <!-- Section H: Verified References & Bibliography -->
    ${options.includeReferences && study.references?.length > 0 ? `
      <h2 class="section-heading">${isAr ? 'المراجع والمصادر العلمية الموثقة' : 'Verified Scholarly References'}</h2>
      <ol style="padding-inline-start: 18px; margin: 0;">
        ${study.references.map(r => `
          <li class="reference-item">
            <strong>${isAr ? r.authorArabic : r.authorEnglish}</strong> —
            <em>${isAr ? r.bookTitleArabic : r.bookTitleEnglish}</em>
            ${r.volumePage ? ` (${r.volumePage})` : ''}
            <span class="badge">${isAr ? r.verificationStatusArabic : r.verificationStatusEnglish}</span>
          </li>
        `).join('')}
      </ol>
    ` : ''}

    <!-- Official Document Footer -->
    <div class="footer-doc">
      <div>د. هشام الخطيب — استشاري الأشعة التشخيصية — مهتم بالطب الإسلامي</div>
      <div style="direction: ltr; font-size: 8.5pt; margin-top: 2px;">
        Dr. Hisham Al-Khatib — Consultant Diagnostic Radiologist — Interested in Islamic Medicine
      </div>
    </div>
  </div>
</body>
</html>`;
}

// Print/Export trigger function: Prints the document without any browser tab logo or headers
export function triggerPdfPrint(study: StudyContent, options: PdfExportOptions): void {
  const htmlContent = generatePrintableHtml(study, options);

  // Hidden iframe ensures clean vector PDF printing without popup windows, external logos, or URL bars
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('title', 'Quranic Study Printable Document');
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.warn('Iframe print error, falling back to popup', e);
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
          }
        } finally {
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 3000);
        }
      }, 500);
    }
  } catch (err) {
    console.error('Print trigger failed:', err);
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }
}

// Download clean, authentic PDF file directly using vector canvas & jsPDF (guaranteed to download without popups or iframe restrictions, and with 0 logos)
export async function downloadPdfFile(study: StudyContent, options: PdfExportOptions): Promise<void> {
  const htmlContent = generatePrintableHtml(study, options);

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '-10000px';
  container.style.width = '794px'; // A4 width at 96 DPI
  container.style.padding = '24px';
  container.style.background = '#ffffff';
  container.style.color = '#1e293b';
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '-9999';
  container.innerHTML = htmlContent;

  document.body.appendChild(container);

  try {
    // Wait for fonts to render
    await new Promise(r => setTimeout(r, 350));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = 297;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const pageCanvasHeight = (canvasWidth * pdfHeight) / pdfWidth;
    let renderedHeight = 0;
    let isFirstPage = true;

    while (renderedHeight < canvasHeight) {
      if (!isFirstPage) {
        pdf.addPage();
      }

      const sliceHeight = Math.min(pageCanvasHeight, canvasHeight - renderedHeight);
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvasWidth;
      pageCanvas.height = sliceHeight;

      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          renderedHeight,
          canvasWidth,
          sliceHeight,
          0,
          0,
          canvasWidth,
          sliceHeight
        );
      }

      const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
      const pageImgHeight = (pageCanvas.height * pdfWidth) / canvasWidth;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pageImgHeight);

      renderedHeight += pageCanvasHeight;
      isFirstPage = false;
    }

    const fileName = `تقرير_تدبر_${study.metadata.surahNameArabic}_${study.metadata.startAyah}-${study.metadata.endAyah}.pdf`;
    pdf.save(fileName);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

// Download ready-to-print HTML document for offline reading & saving as PDF
export function downloadCleanPdfHtml(study: StudyContent, options: PdfExportOptions): void {
  const htmlContent = generatePrintableHtml(study, options);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `تقرير_تدبر_${study.metadata.surahNameArabic}_${study.metadata.startAyah}-${study.metadata.endAyah}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
