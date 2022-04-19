import { BloggerType, PostType } from './../types/index';
import { MongoClient } from 'mongodb';

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017/';

const client = new MongoClient(mongoUri);
const db = client.db('blog');
export const postsCollection = db.collection<PostType>('posts');
export const bloggersCollection = db.collection<BloggerType>('bloggers');

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('shop').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log('Can"t connect to server');

    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
