import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {postsRouter} from './routes/posts-router';
import {bloggersRouter} from './routes/bloggers-router';

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)



app.get('/', (req: Request, res: Response) => {
  res.send('HW bloggers');
});


app.listen(port, () => {
  console.log(`Example app listening npon port ${port}`);
});