import express from 'express'
import {AuthRouter} from "./controllers/AuthController";
import {PORT} from "./config";


const app = express();



app.use("/auth", AuthRouter);


app.listen(PORT, () => {
    console.log(`The server is up on port: ${PORT}`)
})