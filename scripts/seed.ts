/**
 * Seed script: Migrates local JSON data into MongoDB Atlas.
 * Run once: npx tsx scripts/seed.ts
 * 
 * Requires MONGODB_URI in .env.local
 */

import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  console.log('   Add: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio');
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('portfolio');

    // 1. Seed portfolio data
    const portfolioPath = path.join(process.cwd(), 'data', 'portfolio-data.json');
    if (fs.existsSync(portfolioPath)) {
      const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));
      
      await db.collection('portfolio').updateOne(
        { _id: 'main' as any },
        { $set: portfolioData },
        { upsert: true }
      );
      console.log('✅ Portfolio data seeded');
    } else {
      console.log('⚠️  No portfolio-data.json found, skipping');
    }

    // 2. Seed blogs
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    if (fs.existsSync(blogsPath)) {
      const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
      
      if (blogs.length > 0) {
        // Clear existing blogs and insert fresh
        await db.collection('blogs').deleteMany({});
        await db.collection('blogs').insertMany(blogs);
        console.log(`✅ ${blogs.length} blog(s) seeded`);
      } else {
        console.log('⚠️  No blogs to seed');
      }
    } else {
      console.log('⚠️  No blogs.json found, skipping');
    }

    // 3. Create indexes
    await db.collection('blogs').createIndex({ slug: 1 }, { unique: true });
    await db.collection('blogs').createIndex({ published: 1 });
    await db.collection('blogs').createIndex({ publishedAt: -1 });
    console.log('✅ Indexes created');

    console.log('\n🎉 Seed complete! Your data is now in MongoDB.');
    console.log('   You can now run: npm run dev\n');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
