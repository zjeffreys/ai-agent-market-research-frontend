import { NextResponse } from 'next/server';
import { generateRoiReport } from '@/lib/pdf/roiReport';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const pdf = await generateRoiReport(data);
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="SGAI_ROI_Report.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
