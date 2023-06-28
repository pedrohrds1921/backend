import { Router } from "express";
import userRoutes from "./user.routes.js";
import foodRoutes from "./Food.routes.js";
import favoritesRoutes from "./favorites.routes.js";
import sessionsRoutes from "./Sessions.router.js"

const routes= Router()

routes.use("/users",userRoutes)
routes.use("/session",sessionsRoutes)
routes.use("/foods",foodRoutes)
routes.use("/favorites",favoritesRoutes)

export default routes