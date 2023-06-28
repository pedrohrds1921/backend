import knex from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";


export async function UserISAdmin(req,res,next){
    const user_id=req.user.id

    const [user]= await knex("Users").where({id:user_id})
    

    if(user.Admin===1){

        next()
    }else{
        throw new AppError ("Usuario não é Admin",401)
    }


}