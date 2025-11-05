import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const CarritoProducto = sequelize.define('carritoProducto',{
    id_carrito:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
            model: 'carritos',
            key: 'id'
        }
    },
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model: 'productos',
            key: 'id'
        }
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    tableName: 'carritoProductos',
    timestamps: true
});
export default CarritoProducto;