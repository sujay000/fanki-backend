import { JWT_SECRET } from "../config";
import prisma from "../prismaClient"
import jwt from 'jsonwebtoken';


const doesUserExist = async (email: string, password: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: {
            email,
            passwordHash: password
        }
    })

    return user !== null
}

const createJWT = (email: string, password: string) => {
    return jwt.sign(email + password, JWT_SECRET, {
        expiresIn: "5h"
    })
}

export {
    doesUserExist,
    createJWT
}