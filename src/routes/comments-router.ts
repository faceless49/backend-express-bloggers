import {Request, Response, Router} from 'express';
import {commentsService} from '../domain/comments-service';

export const commentsRouter = Router();

// * Get comment by id

commentsRouter.get('/:commentId', async (req: Request, res: Response) => {
  const commentId = Number(req.params.id)
  const users = await commentsService.findComment(commentId);
  if (users) {
    res.send(users);
  } else {
    res.send(404)
  }
});
