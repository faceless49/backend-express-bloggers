import {BloggerType} from '../types';
import {bloggersCollection, postsCollection} from './db';
import {RequestQueryType} from '../helpers';

export const bloggersRepository = {
  async findAllBloggers({
    page,
    pageSize,
    searchNameTerm
  }: RequestQueryType) { // TODO: ToLowerCase
    const filter = {name: {$regex: searchNameTerm ? searchNameTerm : ''}}
    const bloggers = await bloggersCollection.find(filter).project({_id: false}).skip((page - 1) * pageSize).limit(pageSize).toArray();
    const totalCount = (await bloggersCollection.find(filter).toArray()).length
    const pagesCount = Math.ceil(totalCount / pageSize)
    return ({
      pagesCount,
      page,
      pageSize,
      totalCount,
      items: bloggers
    })
  },

  async findBloggerById(id: number) {
    const blogger = bloggersCollection.findOne({id}, {projection: {_id: 0}})
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },

  async createBlogger(newBlogger: BloggerType) {
    await bloggersCollection.insertOne(newBlogger, {forceServerObjectId: true});
    return newBlogger;
  },

  async updateBloggerById(id: number, name: string, youtubeUrl: string): Promise<boolean> {
    const result = await bloggersCollection.updateOne(
      {id: +id},
      {$set: {name, youtubeUrl}},
    );
    await postsCollection.updateMany( {bloggerId: id},
      {$set: {
          "bloggerName": name
        }}
    )
    return result.modifiedCount === 1
  },

  async deleteBloggerById(id: number): Promise<boolean> {
    const result = await bloggersCollection.deleteOne({id: +id});

    return result.deletedCount === 1
  },
};
