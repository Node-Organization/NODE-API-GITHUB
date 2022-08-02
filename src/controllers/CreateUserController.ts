import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController{
    async handle(req: Request, res: Response){
        const { nameuser ,password, email } = req.body;

        const service = new CreateUserService();

        const result  = await service.execute( { nameuser ,password, email } );

        if(result == false){
            return res.json({ err: 'user exists' }).status(400).end();
        }

        return res.json(result).status(200);
    }
}