import express from 'express'
import { AuthRouter } from "./controllers/AuthController"
import { PORT } from "./config"
import { DecksRouter } from './controllers/DecksController'


const app = express()

app.use(express.json())


const somefn = () : Promise<boolean> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 100);
    })
}

const som = async () => {
    // await somefn()

    throw new Error("error from som")

}

app.post("/", async (req, res, next) => {
    // next (new Error("hsdflasdlfkj"))

        await som()
    

    res.status(200).json({
        msg: "hello world suceess"
    })
})



// app.use("/auth", AuthRouter)

// app.use("/decks", DecksRouter)

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // @ts-ignore
    console.log(err.status)
    console.error(err);
    

    const { message, statusCode } = err as { message: string, statusCode: number }
    res.status(statusCode).json({
        error: message
    })
})

app.listen(PORT, () => {
    console.log(`The server is up on port: ${PORT}`)
})