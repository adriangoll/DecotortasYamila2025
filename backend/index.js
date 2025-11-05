import express from 'express';
import cors from 'cors'
import { sequelize } from './src/models/index.js';
import administradorRoute from'./src/routes/admin.routes.js';
import carritoRoute from'./src/routes/carrito.routes.js';
import carritoProductoRoute from'./src/routes/carritoProducto.routes.js';
import categoriaRoute from'./src/routes/categorias.routes.js';
import compraRoute from'./src/routes/compra.routes.js';
import contactoRoutes from'./src/routes/contacto.routes.js';
//import invitacionRoute from'./src/routes/invitacion.routes.js';
import productoRoute from'./src/routes/productos.routes.js';
import usuarioRoute from'./src/routes/usuarios.routes.js';
//import cuponDescuento from './src/routes/cuponDescuento.routes.js';
import mensajeRoute from './src/routes/mensajes.routes.js';
//import metodoEnvioRoute from './src/routes/metodoEnvio.routes.js';
//import metodoPagoRoute from './src/routes/metodoPago.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//Ruta de prueba

app.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ mensaje: 'Servidor operativo' });
});

app.use('/api/categoria', categoriaRoute);
app.use('/api/carrito', carritoRoute);
app.use('/api/carritoProducto', carritoProductoRoute);
app.use('/api/administrador', administradorRoute);
app.use('/api/compra', compraRoute);
app.use('/api/contacto', contactoRoutes);

//app.use('/api/invitacion', invitacionRoute);
app.use('/api/producto', productoRoute);
app.use("/uploads", express.static("uploads"));
app.use('/api/usuario', usuarioRoute);
//app.use('/api/cupones', cuponDescuento);
app.use('/api/mensajes', mensajeRoute);
//app.use('/api/metodos-envio', metodoEnvioRoute);
//app.use('/api/metodos-pago', metodoPagoRoute);

//Iniciar servidor y probar coneccion DB

async function starServer() {
    try{
        //Intenta autenticar la db
        await sequelize.authenticate();
        console.log('✅ Conexxion con la base de datos extablecida correctamente');
        await sequelize.sync({ alter: false, force: false }); // o alter: true
        console.log('🧱 Tablas sincronizadas');
        app.listen(PORT, ()=>{
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            
        })
    } catch(error){
        console.error('❌ No se pudo conectar a la base de datos:', error);
        
    }
    
}

starServer()