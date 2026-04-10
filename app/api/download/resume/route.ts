import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf');
    
    // Check if file exists first
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Resume file not found on server.', { status: 404 });
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
