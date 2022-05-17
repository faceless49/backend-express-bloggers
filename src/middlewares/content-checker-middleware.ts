import {NextFunction, Request, Response} from 'express';



export const contentCheckerMiddleware = (typeContent: string) => (req: Request, res: Response, next: NextFunction) => {
    const checkContent = req.headers['content-type'];
    if (checkContent === typeContent) {
        next()
    } else {
        res.status(400).send('bad content type')
    }
}