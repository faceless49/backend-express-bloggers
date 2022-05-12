import {validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';

type ErrorMessageType = {
  message: string;
  field: string;
}
export const urlValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    const errorsOccurred: ErrorMessageType[] = errors.array({onlyFirstError: true}).map(e => {
      return {
        message: e.msg,
        field: e.param
      }
    })
    res.status(400).json(
      {
        'errorsMessages': errorsOccurred,
        'resultCode': 1
      }
    )
  }
};
