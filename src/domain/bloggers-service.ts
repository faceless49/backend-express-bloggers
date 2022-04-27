import { bloggersRepository } from '../repositories/bloggers-db-repository';
import {RequestQueryType} from '../helpers';

export const bloggersService = {
  async findAllBloggers(reqParams: RequestQueryType) {
    return await bloggersRepository.findAllBloggers(reqParams);
  },
  async findBloggerById(id: number) {
    return await bloggersRepository.findBloggerById(id);
  },
  async createBlogger(name: string, youtubeUrl: string) {
    const bloggerToPush = {
      id: +new Date(),
      name,
      youtubeUrl,
    };
    return await bloggersRepository.createBlogger(bloggerToPush);
  },

  async updateBloggerById(id: number, name: string, youtubeUrl: string) {
    return await bloggersRepository.updateBloggerById(id, name, youtubeUrl);
  },

  async deleteBloggerById(id: number): Promise<boolean> {
    return await bloggersRepository.deleteBloggerById(id);
  },
  async findPostsByBloggerId(id: number) {
    return await bloggersRepository.findBloggerById(id);
  },
};
