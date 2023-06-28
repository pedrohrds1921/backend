import express from "express";
import 'express-async-errors';
import routes from "./routes/index.js";
import { AppError } from "./utils/AppError.js";
import cors from "cors"

import { UPLOADS_FOLDER } from './configs/upload.js'

const app= express()

app.use(cors())

const PORT = 3000  
app.use(express.json())

app.use("/files",express.static(UPLOADS_FOLDER))

app.use(routes)
app.use((error, request,response,next)=>{
    if(error instanceof AppError){
        return response.status(error.statuscode).json({
            status:"erro",
            message: error.mensage
        })
        return response.status(500).json({
            status:"error",
            message:"Internal Server error"
        })
    }
    
})
app.listen(PORT,()=>console.log(`Server running ${PORT}`))
