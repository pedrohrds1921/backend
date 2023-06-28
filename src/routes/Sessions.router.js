import { Router } from "express";
import { SessionsController } from "../controller/SessionsController.js";

const sessionsRoutes= Router()

const sessionsController= new SessionsController()

sessionsRoutes.post("/",sessionsController.create)

export default sessionsRoutes