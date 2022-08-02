import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){

    const authToken = req.headers.authorization;

    if(!authToken){
        return res.json({ error: 'Token not exists' }).status(400).end();
    }

    const [ bearer, token ] = authToken.split(" ");

    try {
        const result = verify(token, "45465446f5d65465fdfdf54654f6d46") as IPayload;
        req.user_id  = result.sub;
        return next();
    } catch (err) {
        return res.json({ error: 'Error token authenticated' }).status(400).end();  
    }
}