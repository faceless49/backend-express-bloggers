import {BloggerType} from '../types';

const bloggers: BloggerType[] = [
  {
    id: 1,
    name: 'Dimych',
    youtubeUrl: 'https://www.youtube.com/c/',
  },
  {
    id: 2,
    name: 'Max',
    youtubeUrl: 'https://www.youtube.com/c/',
  },
];





export const bloggersRepository = {
  async getAllBloggers():Promise<BloggerType[]> {
    return bloggers
  },

  async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType> {
      const newBlogger = {
        id: +new Date(),
        name,
        youtubeUrl,
        // posts: []
      }
      bloggers.push(newBlogger)
      return newBlogger
  },

  async findBloggerById(id: number): Promise<BloggerType | undefined> {
    return bloggers.find((b) => b.id === id);
  },

  async updateBloggerById(id: number, name: string, youtubeUrl: string): Promise<number> {
    const blogger = bloggers.find((b) => b.id === id);
    if (!blogger) {
      return 404
    }  else {
      blogger.name = name;
      blogger.youtubeUrl = youtubeUrl;
      return 204
    }
  },

  async deleteBloggerById(id: number): Promise<boolean> {
    for (let i = 0; i < bloggers.length; i++) {
      if (bloggers[i].id === id) {
        bloggers.splice(i,1)
        return true
      }
    }
    return false
  }

}

