import knex from "../database/knex/index.js"

import { AppError } from "../utils/AppError.js"
import { compare } from "bcrypt"

import {jwtConfig} from "../configs/auth.js"
import jwt from "jsonwebtoken";

const { sign } = jwt;

export class SessionsController{

async create(req,res){
    const {email, password}=req.body

    const user= await knex("Users").where({email}).first()
 
    if(!user){
        throw new AppError("Email e/ou senha invalidos",401)
    }

    const passwordCheked= await compare(password,user.Password)

    if(!passwordCheked){
        throw new AppError("Email e/ou senha invalidos",401)
    }

    const {secret,expiresIn}= jwtConfig

    const token =sign({},secret,{
        subject:String(user.id),
        expiresIn
    })

    return res.json({user,token})
  

}

}