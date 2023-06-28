import { Router } from "express";
import { UserControler } from "../controller/UserController.js";
import { ensureauth } from "../middleware/ensureauth.js";

const userRoutes= Router()

const useController= new UserControler()

userRoutes.post("/",useController.create)
userRoutes.put("/",ensureauth,useController.update)
export default userRoutes