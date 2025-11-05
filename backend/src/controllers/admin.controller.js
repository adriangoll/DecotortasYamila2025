import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Administrador } from '../models/index.js';


const secret = process.env.JWT_SECRET || 'changeme'

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Administrador.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Credenciales inválidas' }); 
    
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
    
    const token = jwt.sign({ id: admin.id, email: admin.email }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
