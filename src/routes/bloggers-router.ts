import {Request, Response, Router} from 'express';
import {bloggersService} from '../domain/bloggers-service';
import {
  bloggerValidationRules,
  inputValidationMiddleware,
} from '../middlewares/input-validation-middleware';
import {postsService} from '../domain/posts-service';
import {getPaginationData} from '../helpers';

export const bloggersRouter = Router();


// * Get all bloggers

bloggersRouter.get('/', async (req: Request, res: Response) => {
  const reqParams = getPaginationData(req.query)
  const result = await bloggersService.findAllBloggers(reqParams)
  res.status(200).send(
    result.items
  )
});


// * Add new blogger

bloggersRouter.post(
  '/',
  bloggerValidationRules,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const {name, youtubeUrl} = req.body;

    const newBlogger = await bloggersService.createBlogger(name, youtubeUrl);
    if (newBlogger) {
      res.status(201).send(newBlogger);
    }
    return
  },
);

// * Get one blogger by id

bloggersRouter.get('/:bloggerId', bloggerValidationRules, async (req: Request, res: Response) => {
  const blogger = await bloggersService.findBloggerById(Number(req.params.bloggerId));
  if (blogger) {
    res.send(blogger);
  } else {
    res.send(404)
  }
});

// * Update existing blogger by id

bloggersRouter.put(
  '/:bloggerId',
  bloggerValidationRules,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const id = Number(req.params.bloggerId);
    const {name, youtubeUrl} = req.body;
    const blogger = await bloggersService.updateBloggerById(id, name, youtubeUrl);
    if (!blogger) {
      res.status(404)
      res.send({
        'errorsMessages': [{
          message: 'blogger not found',
          field: 'id'
        }],
        'resultCode': 0
      })
    } else {
      res.status(204).send(204)
    }
  })

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
  }
})

// * Delete all bloggers

bloggersRouter.delete('/', async (req: Request, res: Response) => {
  const isDeleted = await bloggersService.deleteBloggers()
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(400)
  }
})