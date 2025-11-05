import sequelize from "../config/conection.js";
import Carrito from "./carrito.js";
import Compra from "./compra.js";
import Producto from "./productos.js";
import Usuario from "./usuarios.js";
//import Invitacion from "./invitacion.js";
import CarritoProducto from "./carritoProducto.js";
import Categoria from "./categorias.js";
import Administrador from "./administrador.js"
import CuponDescuento from "./cuponDescuento.js";
import Mensaje from "./mensajes.js";
import MetodoEnvio from "./metodoEnvio.js";
import MetodoPago from "./metodoPago.js";

// Usuario.hasMany(Invitacion,{
//     foreignKey: 'id_usuario'
// });

// Invitacion.belongsTo(Usuario,{
//     foreignKey: 'id_usuario'
// });

Categoria.hasMany(Producto, {
    foreignKey: 'id_categoria',
});

Producto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
});

Carrito.hasMany(CarritoProducto, {
    foreignKey: 'id_carrito',
});

CarritoProducto.belongsTo(Carrito,{
    foreignKey: 'id_carrito'
});

Producto.hasMany(CarritoProducto, {
    foreignKey: 'id_producto'
});

CarritoProducto.belongsTo(Producto,{
    foreignKey:'id_producto'
});

Compra.hasOne(Carrito, {
    foreignKey: 'id_compra'
});

Carrito.belongsTo(Compra, {
    foreignKey: 'id_compra'
});

Producto.hasMany(Mensaje, {
    foreignKey: 'id_producto'
});

Mensaje.belongsTo(Producto, {
    foreignKey: 'id_producto'
});

Usuario.hasMany(Carrito, {
    foreignKey: 'id_usuario'
});

Carrito.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});

Administrador.hasMany(Producto,{
    foreignKey: 'id_administrador'
});
Producto.belongsTo(Administrador,{
    foreignKey: 'id_administrador'
});

// Producto.hasMany(ProductoAdmin,{
//     foreignKey: 'id_producto'
// });

// ProductoAdmin.belongsTo(Producto,{
//     foreignKey: 'id_producto'
// });

Usuario.hasMany(CuponDescuento, {
    foreignKey: 'id_usuario'
});

CuponDescuento.belongsTo(Usuario,{
    foreignKey: 'id_usuario'
});

Compra.hasOne(CuponDescuento, {
    foreignKey: 'id_compra'
});

CuponDescuento.belongsTo(Compra,{ 
    foreignKey: 'id_compra'
});

// Relaciones para MetodoEnvio
Compra.belongsTo(MetodoEnvio, {
    foreignKey: 'id_metodo_envio'
});

MetodoEnvio.hasMany(Compra, {
    foreignKey: 'id_metodo_envio'
});

// Relaciones para MetodoPago
Compra.belongsTo(MetodoPago, {
    foreignKey: 'id_metodo_pago'
});

MetodoPago.hasMany(Compra, {
    foreignKey: 'id_metodo_pago'
});

export{
    sequelize,
    Carrito,
    Compra,
    Producto,
    Usuario,
//    Invitacion,
    CarritoProducto,
    Categoria,
    Administrador,
    CuponDescuento,
    Mensaje,
    MetodoEnvio,
    MetodoPago
}