import {NextFunction, Request, Response} from 'express';
import {validationResult, body} from 'express-validator';

const urlValid = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/


type ErrorMessageType = {
	message: string;
	field: string;
}

export const postValidationRules = [
	body('title').isString().isLength({max: 30}).trim().not().isEmpty().withMessage('Name should be a string less 30ch'),
	body('shortDescription').isString().isLength({max: 100}).trim().not().isEmpty().withMessage('shortDescription should be a string less 100ch'),
	body('content').isString()
		.isLength({max: 1000}).trim().not().isEmpty().withMessage('shortDescription should be a string less 1000ch')
]

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

export const bloggerValidationRules = [
	body('name').isString().isLength({max: 15}).trim().not().isEmpty().withMessage('Name should be a string'),
	body('youtubeUrl').matches(urlValid).isLength({max: 100}).withMessage('URL invalid'),
]