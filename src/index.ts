import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {BloggerType, PostType} from './types';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

let bloggers: BloggerType[] = [
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

const urlValid = new RegExp(/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)

app.get('/', (req: Request, res: Response) => {
  res.send('HW bloggers');
});

// * Get all bloggers

app.get('/bloggers', (req: Request, res: Response) => {
  res.send(bloggers);
});

// ^ Add new blogger

app.post('/bloggers', (req: Request, res: Response) => {

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

app.get('/bloggers/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const blogger = bloggers.find((b) => b.id === id);
  if (blogger) {
    res.send(blogger);
  } else {
    res.send(404);
  }
});

// * Update existing blogger by id

app.put('/bloggers/:bloggerId', (req: Request, res: Response) => {
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

app.delete('/bloggers/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const newBloggers = bloggers.filter((b) => b.id !== id);
  if (newBloggers.length < bloggers.length) {
    bloggers = newBloggers;
    res.send(200);
  } else {
    res.send(404);
  }
});

// * Get all posts

app.get('/posts/', (req: Request, res: Response) => {
  res.send(posts)
});

// * Add new post

app.post('/posts', (req: Request, res: Response) => {
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

app.get('/posts/:postId', (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const post = posts.find((p) => p.id === id);

  if (post) {
    res.send(post);
  } else {
    res.send(404);
  }
});

// * Update existing post by id

app.put('/posts/:postId', (req: Request, res: Response) => {
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

app.delete('/posts/:postId', (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const newPosts = posts.filter((p) => p.id !== id);
  if (newPosts.length < posts.length) {
    posts = newPosts;
    res.send(200);
  } else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening npon port ${port}`);
});