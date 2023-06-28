import knex from "../database/knex/index.js";
import DiskStorage from "../providers/DiskStorage.js";
const diskStorage = new DiskStorage()

export class FoodController{
async create(req,res){
    const {Name,Price,Category,Description,Ingredients}=req.body
    const user_id=req.user.id
    const FoodInsert={
        Name,Price,Category,Description,user_id
    }
    const [Food_id]= await knex("Foods").insert(FoodInsert)
    if(Ingredients!=""){
        const ingredientsInsert= Ingredients.map(ingredients=>{
            return{
                Food_id,
                user_id,
                Name:ingredients
            }
        })
        await knex("Ingredients").insert(ingredientsInsert)
    }
    return res.json(Food_id)



}
async show(req,res){
    const {search}=req.query
    const id=req.params.id
    let Foods
    let ingredients


    if(search){
        const filterIngredients = search.split(',').map(ingredient=>ingredient.trim())
        ingredients= await knex("Ingredients").whereLike('Name',`%${filterIngredients}%`)
        if(ingredients.length<=0){
            Foods= await knex("Foods").whereLike('Name',`%${filterIngredients}%`)
            ingredients= await knex("Ingredients")
        }else{
        const foodIds = ingredients.map(ingredient => ingredient.food_id);
        Foods= await knex("Foods").whereIn('id',foodIds)
    }
    }else{
        Foods= await knex("Foods")
        ingredients= await knex("Ingredients")
    }
    if(id){
        Foods= await knex("Foods").where({id})
        ingredients= await knex("Ingredients")
    }
    const foodWithIngredients= Foods.map(Food=>{
        const ingredientsFood= ingredients.filter(ingredient=>ingredient.food_id === Food.id).map(ingredients=>ingredients.Name)
        return{
            ...Food,
            ingredientsFood
        }
    })
    res.send(foodWithIngredients)
}
async edit(req,res){
const {id}=req.params
const user_id=req.user.id
const {Name,Price,Category,Ingredients,Description}=req.body

let ingredients

const [Foods]= await knex("Foods").where({id})



Foods.Name= Name ?? Foods.Name
Foods.Price= Price ?? Foods.Price
Foods.Category= Category ?? Foods.Category
Foods.Description= Description ?? Foods.Description

ingredients=await knex("Ingredients").where({Food_id:id})


if(Ingredients){
    await knex("Ingredients").where({Food_id:id}).delete()
    const ingredientsInsert= Ingredients.map(ingredients=>{
        return{
            Food_id:id,
            user_id,
            Name:ingredients
        }
    })
    await knex("Ingredients").insert(ingredientsInsert)
}


const foodsUpdated= await knex("Foods").where({id}).update({
    Price:Foods.Price,
    Name:Foods.Name,
    Category:Foods.Category,
    Description:Foods.Description,
    updated_at:knex.raw("DATETIME('now', 'localtime')")
}).returning('*')

return res.send(foodsUpdated)
}
async delete(req,res){
    const {id}=req.params
    await knex("Foods").where({id}).delete()
    return res.send("Prato deletado")
}
async upImage(req,res){
    const id=req.params.id
    const foodImageFile= req.file.filename
    const Food= await knex("Foods").where({id}).first()
    if(Food.Food_Image){
        await diskStorage.deleteFile(Food.Food_Image)
    }
    const filename= await diskStorage.saveFile(foodImageFile)

    Food.Food_Image=filename
    await knex("Foods").update(Food).where({id})
    return res.json(Food)
    
}
}
