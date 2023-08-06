import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { errorToJSON } from 'next/dist/server/render';

export default async function handler(req: NextApiRequest,res:NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try{
        const {email, name, password} = req.body;
        //Now we are gonna check if the email has been already used in the past
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });
        //In the case the email has been used, show error
        if(existingUser){
            return res.status(442).json({error:'Email taken'});
        }
        //Otherwise, continue our task and encrypt our password
        const hashedPassword = await bcrypt.hash(password,12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}