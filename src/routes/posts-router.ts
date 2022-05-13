import {Request, Response, Router} from 'express';
import {bloggersService} from '../domain/bloggers-service';
import {postsService} from '../domain/posts-service';
import {
  inputValidationMiddleware,
  postValidationRules
} from '../middlewares/input-validation-middleware';
import {getPaginationData} from '../helpers';

export const postsRouter = Router();

// * Get all posts

postsRouter.get('/', async (req: Request, res: Response) => {
  const reqParams = getPaginationData(req.query)
  const posts = await postsService.findPosts(reqParams, null);
  res.send(posts.items);
});

// * Add new post

postsRouter.post(
  '/',
  postValidationRules,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId} = req.body;
    const blogger = await bloggersService.findBloggerById(bloggerId)
    if (!blogger) {
      res.status(400).send({
        'errorsMessages': [
          {
            message: 'blogger not found',
            field: 'bloggerId'
          }
        ],
        'resultCode': 1
      })
    } else {
      const newPost = await postsService.createPost(
        title,
        shortDescription,
        content,
        Number(bloggerId),
      );
      res.status(201).send(newPost)
    }
  })


// * Get one post by id

postsRouter.get('/:postId', async (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const post = await postsService.findPostById(id);
  if (post) {
    res.status(200).send(post);
  } else {
    res.send(404);
  }
});

// * Update existing post by id

postsRouter.put(
  '/:postId',
  postValidationRules,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const id = Number(req.params.postId);
    const {title, shortDescription, content, bloggerId} = req.body;
    const updatedPost = await postsService.updatePostById(
      id,
      title,
      shortDescription,
      content,
    );

    const updatedBlogger = await bloggersService.findBloggerById(bloggerId);
    if (!updatedBlogger) {
      res.status(400).send({
        'errorsMessages': [{
          message: 'blogger not found',
          field: 'bloggerId'
        }],
        'resultCode': 1
      })
      return
    }
    if (!updatedPost) {
      res.status(404)
      res.send({
        'errorsMessages': [{
          message: 'post not found',
          field: 'id'
        }],
        'resultCode': 0
      })
    } else {
      res.status(204).send(updatedPost)
    }
  },
);

// * Delete post by id

postsRouter.delete('/:postId', async (req: Request, res: Response) => {
  const isDeleted = await postsService.deletePostById(+req.params.postId);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

postsRouter.delete('/', async (req: Request, res: Response) => {
  const isDeleted = await postsService.deletePosts();
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
