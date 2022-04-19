import { BloggerType } from '../types';
import { bloggersCollection } from './db';

export const bloggersRepository = {
  async findAllBloggers(): Promise<BloggerType[]> {
    return bloggersCollection.find({}).toArray();
  },

  async findBloggerById(id: number) {
    const blogger = bloggersCollection.findOne({ id: id });
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },

  async createBlogger(newBlogger: BloggerType) {
    await bloggersCollection.insertOne(newBlogger);
    return newBlogger;
  },

  async updateBloggerById(id: number, name: string, youtubeUrl: string): Promise<number> {
    const result = await bloggersCollection.updateOne(
      { id: +id },
      { $set: { name, youtubeUrl } },
    );
    if (!result) {
      return 404;
    } else {
      return 204;
    }
  },

  async deleteBloggerById(id: number): Promise<boolean> {
    const result = await bloggersCollection.deleteOne({ id: +id });

    if (result) {
      return true;
    } else {
      return false;
    }
  },
};
