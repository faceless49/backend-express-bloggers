import {Request, Response, Router} from 'express';
import {getPaginationData} from '../helpers';
import {usersService} from '../domain/users-service';

export const usersRouter = Router();

// * Get all users

usersRouter.get('/', async (req: Request, res: Response) => {
  const reqParams = getPaginationData(req.query)
  const users = await usersService.findUsers(reqParams);
  res.send(users);
});
