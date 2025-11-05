import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const Carrito = sequelize.define('carrito',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'usuarios',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    tableName: 'carritos',
    timestamps: true
});

export default Carrito;