import {Request, Response, Router} from 'express';
import {bloggersRepository} from '../repositories/bloggers-repository';

export const bloggersRouter = Router()


// * Get all bloggers

bloggersRouter.get('/', (req: Request, res: Response) => {
  const bloggers = bloggersRepository.getAllBloggers();
  res.send(bloggers);
});

// ^ Add new blogger

bloggersRouter.post('/', (req: Request, res: Response) => {
  const {name, youtubeUrl} = req.body;


  const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)
  if (newBlogger) {
    res.send(201)
    return newBlogger
  } else {
    res.send(400)
  }
})
;

// * Get one blogger by id

bloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
  const isExist = bloggersRepository.findBloggerById(Number(req.params.bloggerId));
  if (isExist) {
    res.send(200)
  } else {
    res.send(400)
  }
});


// * Update existing blogger by id

bloggersRouter.put('/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const {name, youtubeUrl} = req.body
  const statusCode = bloggersRepository.updateBloggerById(id, name, youtubeUrl)
  res.send(statusCode)
});

// * Delete blogger by id

bloggersRouter.delete('/:bloggerId', (req: Request, res: Response) => {
  const id = Number(req.params.bloggerId);
  const isDeleted = bloggersRepository.deleteBloggerById(id);
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
});