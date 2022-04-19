import { postsRepository } from '../repositories/posts-db-repository';
import { PostType } from '../types';

export const postsService = {
  async findPosts() {
    return postsRepository.findPosts();
  },
  async findPostById(id: number): Promise<PostType | false> {
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
      bloggerName: '',
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
