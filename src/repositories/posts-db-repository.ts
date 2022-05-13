import {PostType} from '../types';
import {bloggersCollection, postsCollection} from './db';
import {RequestQueryType} from '../helpers';

export const postsRepository = {
  async findPosts(reqParams: RequestQueryType, bloggerId: number | null) {
    const {
      page,
      pageSize,
    } = reqParams

    const filter = bloggerId ? bloggerId : {}
    const totalCount = (await postsCollection.find(filter).toArray()).length

    const pagesCount = Math.ceil(totalCount / pageSize)
    const posts = await postsCollection.find(filter, {projection: {_id: 0}}).skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray()

    return ({
      // pagesCount,
      // page,
      // pageSize,
      // totalCount,
      items: posts
    })
  },

  async findPostById(postId: number) {
    const post = await postsCollection.findOne({id: postId});
    if (!post) {
      return false;
    }
    const blogger = await bloggersCollection.findOne({id: post.bloggerId});
    if (!blogger) {
      return false;
    }
    const bloggerName = blogger.name;
    return {
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      bloggerId: post.bloggerId,
      bloggerName,
    };
  },

  async createPost(newPost: PostType) {
    const blogger = await bloggersCollection.findOne({id: newPost.bloggerId});
    await postsCollection.insertOne({
      ...newPost,
      bloggerName: blogger?.name,
    }, {forceServerObjectId: true});
    const postForReturn = await postsCollection.findOne({id: newPost.id}, {projection: {_id: 0}});
    return postForReturn;
  },

  async updatePostById(
    id: number,
    title: string,
    shortDescription: string,
    content: string,
  ) {
    const result = await postsCollection.updateOne(
      {id},
      {$set: {title, shortDescription, content}},
    );
    return result.modifiedCount === 1;
  },

  async deletePostById(id: number) {
    const result = await postsCollection.deleteOne({id});
    return result.deletedCount === 1;
  },
  async deletePosts() {
    const result = await postsCollection.deleteMany({});
    return result.deletedCount !== 0;
  },
};
