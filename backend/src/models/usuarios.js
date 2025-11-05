import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";


const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:  false
    },
    apelido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    puntos: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hobbies: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    tableName: 'usuarios',
    timestamps: true
});

export default Usuario;