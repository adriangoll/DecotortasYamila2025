import { Router } from "express";
import { uploadCat } from "../middlewares/multer.js";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categorias.controller.js";

const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
router.post("/", uploadCat, createCategoria);
router.put("/:id",uploadCat, updateCategoria);
router.delete("/:id", deleteCategoria);

export default router;
