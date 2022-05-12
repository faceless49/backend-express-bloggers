import {postsRepository} from '../repositories/posts-db-repository';
import {PostType} from '../types';
import {RequestQueryType} from '../helpers';

export const postsService = {
  async findPosts(reqParams: RequestQueryType, bloggerId: number | null) {
    return postsRepository.findPosts(reqParams, bloggerId);
  },
  async findPostById(id: number) {
    const post = await postsRepository.findPostById(id);
    if (post) {
      return post;
    } else return false;
  },
  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
  ) {
    const newPost: PostType = {
      id: +new Date(),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: 'Test',
    };
    return await postsRepository.createPost(newPost);
  },
  async updatePostById(
    id: number,
    title: string,
    shortDescription: string,
    content: string,
  ) {
    return await postsRepository.updatePostById(id, title, shortDescription, content);
  },
  async deletePostById(id: number) {
    return await postsRepository.deletePostById(id);
  },
};
