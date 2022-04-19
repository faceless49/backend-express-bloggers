import { BloggerType, PostType } from './../types/index';
import { MongoClient } from 'mongodb';

const mongoUri =
  process.env.mongoURI || 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';

const client = new MongoClient(mongoUri);
const db = client.db;
export const postsCollection = db('blog').collection<PostType>('posts');
export const bloggersCollection = db('blog').collection<BloggerType>('bloggers');

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('blog').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
