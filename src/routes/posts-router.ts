import {Request, Response, Router} from 'express';
import {postsRepository} from '../repositories/posts-repository';
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware';
import {body} from 'express-validator';

export const postsRouter = Router()


// * Get all posts


postsRouter.get('/', (req: Request, res: Response) => {
  const posts = postsRepository.findPosts();
  res.send(posts)
});

// * Add new post
const titleValidation = body('title').trim().isLength({min: 1,max: 30})
const descriptionValidation = body('shortDescription').trim().isLength({min: 1,max: 100})
const contentValidation = body('content').trim().isLength({min: 1, max: 1000})

postsRouter.post('/',
  titleValidation,
  descriptionValidation,
  contentValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
  const {title, shortDescription, content, bloggerId} = req.body;

  const newPost = postsRepository.createPost(title, shortDescription, content, bloggerId);
  if (newPost) {
    res.status(201).send(newPost)
  } else {
    res.send(400)
  }
});

// * Get one post by id

postsRouter.get('/:postId', (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const post = postsRepository.findPostById(id)
  if (post) {
    res.send(post);
  } else {
    res.send(404);
  }
});

// * Update existing post by id

postsRouter.put('/:postId',
  titleValidation,
  descriptionValidation,
  contentValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
  const id = Number(req.params.postId);
  const {title, shortDescription, content, bloggerId} = req.body;
  const status = postsRepository.updatePostById(id, title, shortDescription, content, bloggerId);
  res.send(status)
});


// * Delete post by id

postsRouter.delete('/:postId', (req: Request, res: Response) => {
  const isDeleted = postsRepository.deletePostById(+req.params.postId);
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
});
