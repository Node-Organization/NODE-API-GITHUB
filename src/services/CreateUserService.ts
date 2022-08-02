
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

interface RequestUser {
    nameuser:    string;
    password:    string;
    email:       String;
}

export class CreateUserService{
    async execute( {nameuser,password,email}:RequestUser ){

        const passwordHash = await hash(password, 8);

        const characters        ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let   key               = '';        
        const charactersLength  = characters.length;

        for ( let i = 0; i < 32; i++ ) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const userExists = await prisma.users.findUnique({
            where: {
                nameuser: nameuser
            }
        });

        if(userExists){
            return false;
        }

        const user = prisma.users.create({
            data: {
                nameuser,
                password: passwordHash,
                email,
                access: key
            }
        });

        return user;
    }
}