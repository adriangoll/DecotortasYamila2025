import { getCarrito, getCarritoById, updateCarrito,
    createCarrito, deleteCarrito } from "../controllers/carrito.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getCarrito);    
router.get("/:id", getCarritoById);
router.post("/", createCarrito);
router.put("/:id", updateCarrito);
router.delete("/:id", deleteCarrito);   

export default router