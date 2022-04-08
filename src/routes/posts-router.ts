import {Request, Response, Router} from 'express';
import {PostType} from '../types';
import {bloggers} from './bloggers-router';

export const productsRouter = Router()
let posts: PostType[] = [
  {
    id: 1,
    title: 'hello',
    shortDescription: 'world hello',
    content: 'lorem',
    bloggerId: 1,
    bloggerName: 'Dimych',
  },
  {
    id: 2,
    title: 'hello',
    shortDescription: 'world hello',
    content: 'lorem',
    bloggerId: 2,
    bloggerName: 'Max',
  },
];



// * Get all posts


productsRouter.get('/', (req: Request, res: Response) => {
  res.send(posts)
});

// * Add new post

productsRouter.post('/', (req: Request, res: Response) => {
  const blogger = bloggers.find(({id}) => id === +req.body.bloggerId)


  if (!req.body.shortDescription || req.body.shortDescription.length > 100
    || !req.body.content || !req.body.title) {
    res.send(400)
  } else if (!blogger) {
    res.send(400)
  } else {
    const newPost: PostType = {
      id: +new Date(),
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      bloggerId: blogger.id,
      bloggerName: blogger.name,
    };
    posts.push(newPost);
    res.send(newPost)
  }
});

// * Get one post by id

productsRouter.get('/:postId', (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const post = posts.find((p) => p.id === id);

  if (post) {
    res.send(post);
  } else {
    res.send(404);
  }
});

// * Update existing post by id

productsRouter.put('/:postId', (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const post = posts.find((p) => p.id === id);
  if (!req.body.shortDescription || req.body.shortDescription.length > 100
    || !req.body.content || !req.body.title) {
    res.send(400);
  } else if (!post) {
    res.send(404)
  } else {
    post.title = req.body.title;
    post.shortDescription = req.body.shortDescription;
    post.content = req.body.content;
    res.send(200);
  }
});

// * Delete post by id

productsRouter.delete('/:postId', (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const newPosts = posts.filter((p) => p.id !== id);
  if (newPosts.length < posts.length) {
    posts = newPosts;
    res.send(200);
  } else {
    res.send(404);
  }
});
