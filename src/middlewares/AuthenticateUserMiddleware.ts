import { NextFunction, Request, Response } from "express"
import { HttpStatus } from "../config"
import { CustomError } from "../errors/CustomError"
import { doesUserExist, verifyJWT } from "../services/ValidationHelper"

export interface customReq extends Request {
    custom: {
        email: string,
        password: string
    }
}

export const authenticateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        console.error("authHeader does not exist")
        next(new CustomError(`Please login properly again. There's problem with your authentication`, HttpStatus.UNAUTHORIZED))
        return
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        console.error("Token does not exist")
        next(new CustomError(`Please login properly again. There's problem with your authentication`, HttpStatus.UNAUTHORIZED))
        return
    }   

    const {email, password} = verifyJWT(token) as unknown as {email: string, password: string}
    const isAuthenticatedUser = doesUserExist(email, password)
    if (!isAuthenticatedUser) {
        console.error("The user with email & password does not exist. Something is wrong with token")
        next(new CustomError(`Something is wrong. Please login properly`, HttpStatus.BAD_REQUEST))
        return
    }


    req.custom = {email, password}

    next()
}