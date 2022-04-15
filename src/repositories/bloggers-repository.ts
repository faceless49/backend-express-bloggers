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
  getAllBloggers() {
    return bloggers
  },

  createBlogger(name: string, youtubeUrl: string) {
      const newBlogger = {
        id: +new Date(),
        name,
        youtubeUrl,
        // posts: []
      }
      bloggers.push(newBlogger)
      return newBlogger
  },

  findBloggerById(id: number) {
    return bloggers.find((b) => b.id === id);
  },

  updateBloggerById(id: number, name: string, youtubeUrl: string) {
    const blogger = bloggers.find((b) => b.id === id);
    if (!blogger) {
      return 404
    }  else {
      blogger.name = name;
      blogger.youtubeUrl = youtubeUrl;
      return 204
    }
  },

  deleteBloggerById(id: number) {
    for (let i = 0; i < bloggers.length; i++) {
      if (bloggers[i].id === id) {
        bloggers.splice(i,1)
        return true
      }
    }
    return false
  }

}

