import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const MetodoPago  = sequelize.define('metodoPago',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    porcentajeRecargo:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        values: false
    }
},{
    tableName: 'metodoPagos',
    timestamps: true
});

export default MetodoPago;