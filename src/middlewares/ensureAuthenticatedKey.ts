
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export async function ensureAuthenticatedKey(req: Request, res: Response, next: NextFunction){
    const { key } = req.params;

    try {
        await prisma.users.findUnique({
            where: {
                access: key
            }
        });
        return next();
    } catch (error) {
        return res.json({ error: 'Key invalited' }).status(400).end();
    }
    
}