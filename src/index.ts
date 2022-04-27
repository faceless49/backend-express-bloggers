import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { runDb } from './repositories/db';
import { bloggersRouter } from './routes/bloggers-router';
import { postsRouter } from './routes/posts-router';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });
};

startApp();
