import {NextFunction, Request, Response} from 'express';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const exceptedAuth = "Basic YWRtaW46cXdlcnR5"
    const auth = req.headers.authorization

    if (!auth) {
        res.sendStatus(401)
        return
    }

    if (auth != exceptedAuth) return res.sendStatus(401)
    next()
}