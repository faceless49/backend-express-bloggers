import {validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';

export const urlValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ codeResult: 0, errorsMessages: errors.array() });
  } else {
    next()
  }
};
