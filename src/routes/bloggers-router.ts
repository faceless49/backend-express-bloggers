import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { bloggersService } from '../domain/bloggers-service';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { urlValidationMiddleware } from '../middlewares/url-validation-middleware';

export const bloggersRouter = Router();

const urlValid = new RegExp(/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/);

// * Get all bloggers

bloggersRouter.get('/', async (req: Request, res: Response) => {
  const bloggers = await bloggersService.findAllBloggers();
  res.send(bloggers);
});

const titleValidation = body('name')
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage('Value length should be 3 to 15');
const urlValidation = body('youtubeUrl')
  .trim()
  .isLength({ max: 100 })
  .withMessage('Length url should be less 100')
  .matches(urlValid)
  .withMessage('Bad url youtube');

// ^ Add new blogger

bloggersRouter.post(
  '/',
  titleValidation,
  inputValidationMiddleware,
  urlValidation,
  urlValidationMiddleware,
  async (req: Request, res: Response) => {
    const { name, youtubeUrl } = req.body;

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

bloggersRouter.get('/:bloggerId', async (req: Request, res: Response) => {
  const blogger = await bloggersService.findBloggerById(Number(req.params.bloggerId));
  if (blogger) {
    res.send(blogger);
  } else {
    res.send(404);
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
    const { name, youtubeUrl } = req.body;
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
