import jwt  from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import {jwtConfig} from "../configs/auth.js"
const {verify}=jwt

export function ensureauth(req,res,next){
const authHeader=req.headers.authorization


    if(!authHeader){

        throw new AppError("JWT TOKEN NÃO INFORMADO",401)
    }

    const [,token]=authHeader.split(" ")


    try{
      const{sub:user_id}= verify(token,jwtConfig.secret)
      req.user={
        id:Number(user_id)
      }

      return next()
    }catch{

        throw new AppError("JWT TOKEN INVALIDO",401)
    }

}