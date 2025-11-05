import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'changeme';

export default function authAdmin(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, secret);
        req.admin = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};