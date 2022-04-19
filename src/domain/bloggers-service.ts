import { bloggersRepository } from '../repositories/bloggers-db-repository';

export const bloggersService = {
  async findAllBloggers() {
    return await bloggersRepository.findAllBloggers();
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
};
