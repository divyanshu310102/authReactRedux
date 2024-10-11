import ConnectDB from "./db/index.js"
import { app } from "./app.js"
import dotenv from 'dotenv'

dotenv.config({
    path : './.env'
})



ConnectDB()
.then(() => {
    app.listen( 8000, () => {
        console.log(`Server is running on port 8000`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!", err)
})
















