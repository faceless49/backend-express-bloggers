import {BloggerType} from '../types';
import {Request, Response, Router} from 'express';

export const bloggersRouter = Router()

export let bloggers: BloggerType[] = [
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

// * Get all bloggers

bloggersRouter.get('/', (req: Request, res: Response) => {
  res.send(bloggers);
});

// ^ Add new blogger

bloggersRouter.post('/', (req: Request, res: Response) => {

  if (req.body.name.trim().length >= 2 && req.body.name.length < 15 && req.body.youtubeUrl.length <= 100 && urlValid.test(req.body.youtubeUrl)) {
    const newBlogger = {
      id: +new Date(),
      name: req.body.name,
      youtubeUrl: req.body.youtubeUrl,
      posts: [],
    };
    bloggers.push(newBlogger);
    res.send(201);
  } else {
    res.send(400)
  }
});

// * Get one blogger by id

bloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const blogger = bloggers.find((b) => b.id === id);
  if (blogger) {
    res.send(blogger);
  } else {
    res.send(404);
  }
});

// * Update existing blogger by id

bloggersRouter.put('/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const blogger = bloggers.find((b) => b.id === id);

  if (!blogger) {
    res.send(404)
  } else if (req.body.youtubeUrl.length > 100 || req.body.name.trim().length < 2 || req.body.name.length > 15 || !urlValid.test(req.body.youtubeUrl)) {
    res.send(400)
  } else {
    blogger.name = req.body.name;
    blogger.youtubeUrl = req.body.youtubeUrl;
    res.send(204);
  }
});

// * Delete blogger by id

bloggersRouter.delete('/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const newBloggers = bloggers.filter((b) => b.id !== id);
  if (newBloggers.length < bloggers.length) {
    bloggers = newBloggers;
    res.send(200);
  } else {
    res.send(404);
  }
});