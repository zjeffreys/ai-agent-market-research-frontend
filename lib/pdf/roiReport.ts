import { PDFDocument, StandardFonts } from 'pdf-lib';

interface RoiReportData {
  assumptions: Record<string, number>;
  outputs: Record<string, number>;
}

export async function generateRoiReport(data: RoiReportData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  // Page 1 - Assumptions
  const page1 = doc.addPage();
  let { height } = page1.getSize();
  page1.drawText('SGAI ROI Report', { x: 50, y: height - 50, size: 24, font });
  page1.drawText('Assumptions', { x: 50, y: height - 80, size: 18, font });
  let y = height - 110;
  for (const [key, value] of Object.entries(data.assumptions)) {
    page1.drawText(`${key}: ${value}`, { x: 50, y, size: 12, font });
    y -= 20;
  }

  // Page 2 - Outputs
  const page2 = doc.addPage();
  height = page2.getSize().height;
  page2.drawText('Results', { x: 50, y: height - 50, size: 24, font });
  y = height - 90;
  for (const [key, value] of Object.entries(data.outputs)) {
    const text = `${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`;
    page2.drawText(text, { x: 50, y, size: 12, font });
    y -= 20;
  }

  return doc.save();
}
