import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { uploadBuffer } from '@/lib/cloudinary';
import { getDb } from '@/lib/mongodb';

// Upload profile picture to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadBuffer(buffer, {
      folder: 'portfolio',
      public_id: 'profile-picture',
      resource_type: 'image',
    });

    // Store the URL in MongoDB portfolio data
    const db = await getDb();
    await db.collection('portfolio').updateOne(
      { _id: 'main' as unknown as import('mongodb').ObjectId },
      { $set: { profileImageUrl: result.url } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, url: result.url, message: 'Profile picture updated' });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
