import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const CuponDescuento = sequelize.define('cuponDescuento',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoCupon:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    porcentajeDescuento:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    tableName: 'cuponesDescuento',
    timestamps: false
});
export default CuponDescuento;