import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

export class ListUsersController {
    async handle(req: Request, res: Response) {
        const { nameuser }  = req.params;

        const service = new ListUsersService();

        const user    = await service.execute(nameuser);

        res.json(user).status(200);
    }
}