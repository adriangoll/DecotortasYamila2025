import { Router } from "express";
import {getCarritoProducto, getCarritoProductoById, updateCarritoProducto,
    createCarritoProducto, deleteCarritoProducto}  from "../controllers/carritoProducto.controller.js";

const router = Router();

// Definir las rutas para carritoProducto

router.get("/", getCarritoProducto);
router.get("/:id", getCarritoProductoById);
router.post("/", createCarritoProducto);
router.put("/:id", updateCarritoProducto);
router.delete("/:id", deleteCarritoProducto);

export default router;