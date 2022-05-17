import {NextFunction, Request, Response} from 'express';


type PageVisitsType = {
    [key: string]: number
}

const pageVisits: PageVisitsType = {}
export const countResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let counter = pageVisits[req.originalUrl];
    if (counter || counter === 0) {
        pageVisits[req.originalUrl] = counter + 1;
    } else {
        pageVisits[req.originalUrl] = 1
    }
    console.log(pageVisits[req.originalUrl])
    res.header('Count', pageVisits[req.originalUrl].toString())
    next()
}