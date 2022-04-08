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


const urlValid = new RegExp(/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)


export const bloggersRepository = {
  getAllBloggers() {
    return bloggers
  },

  createBlogger(name: string, youtubeUrl: string) {
    if (name.trim().length >= 2 && name.length < 15 && youtubeUrl.length <= 100 && urlValid.test(youtubeUrl)) {
      const newBlogger = {
        id: +new Date(),
        name,
        youtubeUrl,
        posts: []
      }
      bloggers.push(newBlogger)
      return newBlogger
    } else {
      return false
    }
  },

  findBloggerById(id: number) {
    const blogger = bloggers.find((b) => b.id === id);
    return !!blogger;
  },

  updateBloggerById(id: number, name: string, youtubeUrl: string) {
    const blogger = bloggers.find((b) => b.id === id);
    if (!blogger) {
      return 404
    } else if (youtubeUrl.length > 100 || name.trim().length < 2 || name.length > 15 || !urlValid.test(youtubeUrl)) {
      return (400)
    } else {
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

