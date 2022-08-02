import { PrismaClient } from '@prisma/client';
import { compare }      from 'bcryptjs';
import { sign }         from 'jsonwebtoken';

const prisma = new PrismaClient();

interface RequestAuthenticated {
    nameuser:    string;
    password: string;
}

export class AuthenticatedUserService{
    async execute( {nameuser, password}:RequestAuthenticated ) {
        const user = await prisma.users.findUnique({
            where: {
                nameuser: nameuser
            }
        });

        if(!user) {
            return false;
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            return false
        }

        const token = sign(
            {

            },
            "45465446f5d65465fdfdf54654f6d46",
            {
                subject: user.id,
                expiresIn: '30s'
            }
        );

        return token;
    }
}