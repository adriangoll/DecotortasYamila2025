import { DataTypes } from "sequelize";
import sequelie from "../config/conection.js";

const Administrador = sequelie.define('administradores',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    }
},{
    timestamps: true,
    tableName: 'administradores'
});

export default Administrador;