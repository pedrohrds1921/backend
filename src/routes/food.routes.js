import { Router } from "express";
import { FoodController } from "../controller/FoodController.js";
import { ensureauth } from "../middleware/ensureauth.js";
import { UserISAdmin } from "../middleware/UserISAdmin.js";
import multer from "multer";
import { MULTERCONFIG } from "../configs/upload.js";
const uploads= multer(MULTERCONFIG)

const   foodRoutes=Router()

const foodController= new FoodController()

foodRoutes.use(ensureauth)
foodRoutes.post("/",UserISAdmin,foodController.create)
foodRoutes.get("/",foodController.show)
foodRoutes.get("/show/:id",foodController.show)
foodRoutes.put("/:id",foodController.edit)
foodRoutes.delete("/:id",UserISAdmin,foodController.delete)
foodRoutes.patch("/foodImage/:id",UserISAdmin,uploads.single("foodImage"),foodController.upImage)

export default foodRoutes
