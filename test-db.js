const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('portfolio');
  const blogs = await db.collection('blogs').find({}).toArray();
  console.log(JSON.stringify(blogs, null, 2));
  await client.close();
}
main().catch(console.error);
