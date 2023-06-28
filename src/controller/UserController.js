
import knex from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import { hash,compare } from "bcrypt";

export class UserControler{
    async create(req,res) {
        let {name,email,password,Admin}=req.body
        const checkUserExists= await knex.select('*').from('Users').where({email})
        if(checkUserExists.length>0){
            throw new AppError('Email existente',)
        }
        if(password.length<6){
            throw new AppError("Crie uma senha com minimo de 6 digitos")
        }
        const hashedPassword=  await hash(password,8)
       if(!Admin){
        Admin=0
       }else{
        Admin=1
       }
        const newUser = {
            name,
            email,
            password:hashedPassword,
            Admin
          };
        await knex('Users').insert(newUser)
        return res.status(201).send('Usuario criado ')
        
    }
    async update (req,res){
        const {name,email,password,old_password}=req.body
        const {id}=req.user
        const [user]= await knex.select('*').from('Users').where({id})

        if (!user){
            throw new AppError('Usuario não encontrato')
        }
        const [userWithUpdateEmail]=await knex.select('*').from('Users').where({email})
      
        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new AppError ('Esse email ja esta em uso.');
        }
        user.name = name ?? user.name
        user.email= email ?? user.email

        if(password && !old_password){
            throw new AppError("Gentileza Informa senha antiga")
        }

        if(password && old_password){
            const checkOldPassword= await compare(old_password,user.Password)
            if(!checkOldPassword){
                throw new AppError("Senha Antiga não confere")
            }
           
            if(password === old_password){
                throw new AppError("Senhas iguas")
                }
        user.password= await hash(password,8)
        }

        await knex('Users').where({ id: user.id }).update({ name: user.name, email: user.email, password: user.password });
        return res.send("Usuario Atualizado")
    }
    



}