import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const Compra = sequelize.define('compra',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'usuarios',
            key: 'id'
        }
    },
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'carritos',
            key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
},
{
    tableName: 'compras',
    timestamps: false
});

export default Compra