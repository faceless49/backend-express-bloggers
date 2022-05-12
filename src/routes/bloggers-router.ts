import {Request, Response, Router} from 'express';
import {body} from 'express-validator';
import {bloggersService} from '../domain/bloggers-service';
import {
  bloggerValidationRules,
  inputValidationMiddleware,
  urlValid
} from '../middlewares/input-validation-middleware';
import {urlValidationMiddleware} from '../middlewares/url-validation-middleware';
import {postsService} from '../domain/posts-service';
import {getPaginationData} from '../helpers';

export const bloggersRouter = Router();


// * Get all bloggers

bloggersRouter.get('/', async (req: Request, res: Response) => {
  const reqParams = getPaginationData(req.query)

  res.status(200).send(
    await bloggersService.findAllBloggers(reqParams)
  )
});

const titleValidation = body('name')
  .trim()
  .isLength({min: 2, max: 15})
  .withMessage('Value length should be 3 to 15');
const urlValidation = body('youtubeUrl')
  .trim()
  .isLength({max: 100})
  .withMessage('Length url should be less 100')
  .matches(urlValid)
  .withMessage('Bad url youtube');

// * Add new blogger

bloggersRouter.post(
  '/',
  titleValidation,
  inputValidationMiddleware,
  urlValidation,
  urlValidationMiddleware,
  async (req: Request, res: Response) => {
    const {name, youtubeUrl} = req.body;

    const newBlogger = await bloggersService.createBlogger(name, youtubeUrl);
    if (newBlogger) {
      res.status(201).send(newBlogger);
      return newBlogger;
    } else {
      res.send(400);
    }
  },
);

// * Get one blogger by id

bloggersRouter.get('/:bloggerId', bloggerValidationRules, async (req: Request, res: Response) => {
  const blogger = await bloggersService.findBloggerById(Number(req.params.bloggerId));
  if (blogger) {
    res.send(blogger);
  } else {
    res.status(400);
    res.send(res.send({
      'errorsMessages': [{
        message: 'blogger not found',
        field: 'id'
      }],
      'resultCode': 1
    }))
  }
});

// * Update existing blogger by id

bloggersRouter.put(
  '/:bloggerId',
  titleValidation,
  inputValidationMiddleware,
  urlValidation,
  urlValidationMiddleware,
  async (req: Request, res: Response) => {
    const id = Number(req.params.bloggerId);
    const {name, youtubeUrl} = req.body;
    const statusCode = await bloggersService.updateBloggerById(id, name, youtubeUrl);
    res.send(statusCode);
  },
);

// * Delete blogger by id

bloggersRouter.delete('/:bloggerId', async (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const isDeleted = await bloggersService.deleteBloggerById(id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});


// * Return all posts by blogger

bloggersRouter.get('/:bloggerId/posts', async (req: Request, res: Response) => {
  const bloggerId = Number(req.params.bloggerId)
  const reqParams = getPaginationData(req.query)
  const blogger = await bloggersService.findBloggerById(Number(req.params.bloggerId));
  if (blogger) {
    const posts = await postsService.findPosts(reqParams, bloggerId)
    res.status(200).send(posts)
  } else {
    res.send(404)
  }
});

// * Create new post for specific blogger
bloggersRouter.post('/:bloggerId/posts', async (req: Request, res: Response) => {
  const bloggerId = Number(req.params.bloggerId)
  const {title, shortDescription, content} = req.body
  const post = await postsService.createPost(title, shortDescription, content, bloggerId)
  if (post) {
    res.status(201).send(post)
  } else {
    res.send(200)
  } //TODO Make Error return
})