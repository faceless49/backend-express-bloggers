import {NextFunction, Request, Response} from 'express';

const blackListIp = ["192.168.1.1"] // * Example IP


export const blacklistMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const result = blackListIp.find((el: string) => el === ip)
    if (result) {
        res.sendStatus(403)
        return
    }
    next()
}