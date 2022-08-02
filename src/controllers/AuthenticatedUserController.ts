import { Request, Response } from "express";
import { AuthenticatedUserService } from "../services/AuthenticatedUserService";

export class AuthenticatedUserController{
    async handle(req: Request, res: Response){
        const { nameuser ,password } = req.body;

        const service = new AuthenticatedUserService();

        const result  = await service.execute( { nameuser ,password } );

        if(result == false){
            return res.json({ err: 'user is password invalited' }).status(400).end();
        }

        return res.json(result).status(200);
    }
}