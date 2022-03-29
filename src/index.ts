import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { send } from 'process';

const app = express();
const port = 4000;

app.use(cors());
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

let bloggers = [
  {
    id: 0,
    name: 'Dimych',
    youtubeUrl: 'https://www.youtube.com/c/ITKAMASUTRA',
    posts: [
      {
        id: 0,
        title: 'Redux',
        shortDescription: 'React',
        content: 'It-kamastura',
        bloggerId: 0,
        blog: 'about IT',
      },
    ],
  },
];

let posts = [
  {
    id: 1,
    title: 'hello',
    shortDescription: 'world hello',
    content: 'lorem',
    bloggerId: 0,
    blog: null,
  },
];

app.get('/', (req: Request, res: Response) => {
  res.send('HW bloggers');
});

// * Get all bloggers

app.get('/bloggers', (req: Request, res: Response) => {
  res.send(bloggers);
});

// * Add new blogger
app.post('/bloggers', (req: Request, res: Response) => {
  const newBlogger = {
    id: +new Date(),
    name: req.body.name,
    youtubeUrl: req.body.youtubeUrl,
    posts: [],
  };
  bloggers.push(newBlogger);
  res.send(200);
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
  if (blogger) {
    blogger.name = req.body.name;
    blogger.youtubeUrl = req.body.youtubeUrl;
    res.send(200);
  } else {
    res.send(404);
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
  res.send(posts);
});

// * Add new post

app.post('/posts', (req: Request, res: Response) => {
  const newPost = {
    id: +new Date(),
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    bloggerId: +new Date(),
    blog: null,
  };
  posts.push(newPost);
  res.send(200);
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
  if (post) {
    post.title = req.body.title;
    post.shortDescription = req.body.shortDescription;
    post.content = req.body.content;
    res.send(200);
  } else {
    res.send(404);
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
