import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { uploadBuffer } from '@/lib/cloudinary';
import { getDb } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary as raw file
    const result = await uploadBuffer(buffer, {
      folder: 'portfolio',
      public_id: 'resume',
      resource_type: 'raw',
    });

    // Store the URL in MongoDB
    const db = await getDb();
    await db.collection('portfolio').updateOne(
      { _id: 'main' as unknown as import('mongodb').ObjectId },
      { $set: { resumeUrl: result.url } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, url: result.url, message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
  }
}
