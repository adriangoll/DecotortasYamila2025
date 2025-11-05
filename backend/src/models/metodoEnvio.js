import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const MetodoEnvio  = sequelize.define('metodoEnvio',{
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
    tiempoEstimado:{
        type: DataTypes.STRING,
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        values: false
    }
},{
    tableName: 'metodoEnvios',
    timestamps: true
});

export default MetodoEnvio;