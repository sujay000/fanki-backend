import express from 'express'
import { AuthRouter } from "./controllers/AuthController"
import { PORT } from "./config"
import { DecksRouter } from './controllers/DecksController'


const app = express()



app.use("/auth", AuthRouter)

app.use("/decks", DecksRouter)


app.listen(PORT, () => {
    console.log(`The server is up on port: ${PORT}`)
})