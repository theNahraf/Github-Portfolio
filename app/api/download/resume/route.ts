import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const data = await db.collection('portfolio').findOne({ _id: 'main' as unknown as import('mongodb').ObjectId });

    // Check if we have a Cloudinary resume URL
    const resumeUrl = data?.resumeUrl;

    if (resumeUrl) {
      // Redirect to Cloudinary URL for download
      return NextResponse.redirect(resumeUrl);
    }

    // Fallback: try serving from public/ (for local dev)
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf');

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Resume file not found.', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Farhan_SDE_Resume.pdf"',
        'Content-Length': fileBuffer.byteLength.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse('Error generating PDF download', { status: 500 });
  }
}
