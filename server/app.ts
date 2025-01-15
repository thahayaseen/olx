import express from 'express'
import dotenv from 'dotenv'
import database from './config/mongoose'
import router from './routes/routes'
import cors from 'cors'


database()
dotenv.config()
const server =express()
const PORT=process.env.PORT||3000
server.use(cors({
    origin:'http://localhost:5173'

}))
server.use(express.json())
server.use('/',router)
server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
    
})
