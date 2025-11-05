import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {getProductos, getProductoById, updateProducto,
    createProducto, deleteProducto}  from "../controllers/productos.controller.js";

const router = Router();

// Definir las rutas para productos
router.get("/", getProductos);
router.get("/:id", getProductoById);
router.post("/", upload, createProducto);
router.put("/:id", upload, updateProducto);
router.delete("/:id", deleteProducto);

export default router;