import { Router } from "express";
import {getUsuario, getUsuarioById, updateUsuario,
    createUsuario, deleteUsuario}  from "../controllers/usuarios.controller.js";

const router = Router();

// Definir las rutas para productos
router.get("/", getUsuario);
router.get("/:id", getUsuarioById);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

export default router;