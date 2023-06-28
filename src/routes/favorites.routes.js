import { Router } from "express";
import { FavoritesController } from "../controller/FavoritesController.js";
import { ensureauth } from "../middleware/ensureauth.js";


const favoritesRoutes=Router()

const favoritesController= new FavoritesController()
favoritesRoutes.use(ensureauth)
favoritesRoutes.get("/:food_id",favoritesController.create)
favoritesRoutes.get("/",favoritesController.show)
favoritesRoutes.delete("/:food_id",favoritesController.delete)

export default favoritesRoutes
