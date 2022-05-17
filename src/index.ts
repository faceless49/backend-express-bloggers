import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {runDb} from './repositories/db';
import {bloggersRouter} from './routes/bloggers-router';
import {postsRouter} from './routes/posts-router';
import {usersRouter} from './routes/users-router';
import {commentsRouter} from './routes/comments-router';

import 'dotenv/config';
import {blacklistMiddleware} from "./middlewares/blacklist-middleware";
import {countResponseMiddleware} from "./middlewares/count-response-middleware";

const app = express();
const port = process.env.PORT || 4000;
/**
 *  * Custom Middleware
 */
app.use(blacklistMiddleware)
app.use(countResponseMiddleware)

app.use(cors());
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);


// * Routers
app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);


/**
 * * Started App
 */
const startApp = async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
};

startApp();
