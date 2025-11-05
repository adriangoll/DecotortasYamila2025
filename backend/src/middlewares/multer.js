import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/';



//Crear el directorio de subida si no existe
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Para el MVP manejamos UNA sola imagen por producto (campo 'imagen')
export const upload = multer({ storage }).single('imagen');

export const uploadCat = multer({ storage }).single('imagenUrl');
