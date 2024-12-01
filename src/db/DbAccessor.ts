import { User } from "@prisma/client";
import prisma from "../prismaClient";



/**
 * Returns User with @param email, if user doesnt exist return null
 * 
 * @param email email of the user
 * @returns User object defined in schema
 */

const getUserByEmail = async (email: string) : Promise<User|null> => {
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })

    return user;
}


const createUser = async (email: string, password: string, username: string) => {
    await prisma.user.create({
        data: {
            email,
            username,
            passwordHash: password,
            lastLogin: new Date().toUTCString()
        }
    })
}


export {
    getUserByEmail,
    createUser
}