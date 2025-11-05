import {Router} from 'express';
import { getMensajes, getMensajesByProducto, createMensaje, deleteMensaje } from '../controllers/mensajes.controller.js';   

const router = Router();
// Ruta para obtener todos los mensajes
router.get('/mensajes', getMensajes);
// Ruta para obtener mensajes por ID de producto
router.get('/:id_producto/mensajes', getMensajesByProducto);
// Ruta para crear un nuevo mensaje
router.post('/mensajes', createMensaje);

// Ruta para eliminar un mensaje por ID
router.delete('/mensajes/:id', deleteMensaje);

export default router;