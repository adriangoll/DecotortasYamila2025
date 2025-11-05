import{Router} from "express";
import{getCompra,getCompraById,updateCompra,
    createCompra,deleteCompra} from "../controllers/compra.controller.js";

const router=Router();

//Definir las rutas para compra

router.get("/",getCompra);
router.get("/:id",getCompraById);
router.post("/",createCompra);
router.put("/:id",updateCompra);
router.delete("/:id",deleteCompra);


export default router;