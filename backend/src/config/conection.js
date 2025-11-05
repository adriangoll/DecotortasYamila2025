import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

//carga variables de entorno (.env)
dotenv.config();


//admin (password = admin123 encriptado con bcrypt)
//('admin@tienda.com', '$2b$10$D2zxi.RjZsZtqDg6kFzPpeGh0J/n9d.t0ZjQdTw1hSmv6m9o1gM3K');

//Extraer variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,  
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT|| 3306),
    dialect: 'mysql',
    logging: false, // Desactivar logs de SQL en consola


})
try {
  await sequelize.authenticate();
  console.log("✅ Conexión con la base de datos establecida correctamente");
} catch (error) {
  console.error("❌ Error de conexión a la base de datos:", error.message);
}

export default sequelize;
