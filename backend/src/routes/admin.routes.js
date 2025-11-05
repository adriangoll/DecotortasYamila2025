import { Router } from "express";
import { login } from "../controllers/admin.controller.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = Router();

router .post("/login", login);

router.get("/dashboard", authAdmin)

export default router