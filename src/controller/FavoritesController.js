import knex from "../database/knex/index.js";

export class FavoritesController{

async create(req,res){
    const {food_id}=req.params

    const user_id=req.user.id

    const favoritesInsert={
        user_id,
        food_id,
    }

    const [favorites]=await knex("Favorites").insert(favoritesInsert).returning("*")
    return res.send(favorites)
}

async show(req,res){
    const user_id=req.user.id
    
    const favorites= await knex("Favorites").where({user_id})
    const foodFavorites = [];

    for (const foods of favorites) {
      const { food_id } = foods;
      const [result] = await knex("Foods").where({ id: food_id }).select("Name", "Price","Category","Description");
      foodFavorites.push(result);
    }

      res.send(foodFavorites)

}

async delete(req,res){
    const {food_id}=req.params

    const user_id=req.user.id

    await knex("Favorites").where({user_id}).where({food_id}).delete()
    return res.send("Removido dos favoritos")
}

}