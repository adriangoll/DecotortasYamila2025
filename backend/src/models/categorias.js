import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const Categoria  = sequelize.define('categoria',{
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
    imagenUrl: {
        type : DataTypes.TEXT,
        allowNull: true
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        values: false
    }
},{
    tableName: 'categorias',
    timestamps: true
});

export default Categoria;