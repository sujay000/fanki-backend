import express from 'express'
import { createJWT, doesUserExist } from '../services/ValidationHelper'
import { createUser, getUserByEmail } from '../db/DbAccessor'
import { HttpStatus } from '../config'

const AuthRouter = express.Router()

AuthRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body
    const user = await getUserByEmail(email)

    if (user === null) {
        next({
            message: `Invalid email, please create an account or check your email`,
            statusCode: HttpStatus.NOT_FOUND
        })
    }
    else if (user.passwordHash !== password) {
        next({
            message: "Invalid password, please create an account",
            statusCode: HttpStatus.UNAUTHORIZED
        })
    } else {
        res.status(HttpStatus.OK).json({
            token: createJWT(email, password)
        })
    }
})

AuthRouter.post("/register", async (req, res, next) => {
    const { email, password, username } = req.body
    const user = await getUserByEmail(email) 

    if (user === null) {
        createUser(email, password, username)
    }
    else {
        next({
            message: "User with this email already exists, please login",
            statusCode: HttpStatus.BAD_REQUEST
        })
    }
})




export {
    AuthRouter
}