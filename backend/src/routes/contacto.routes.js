import express from 'express';
import enviarMensajeContacto from '../controllers/contacto.controller.js';

const router = express.Router();

// Ruta para manejar el formulario de contacto
router.post('/', enviarMensajeContacto);    

export default router; 