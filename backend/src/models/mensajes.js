import {DataTypes} from 'sequelize';
import sequelize from '../config/conection.js';

const Mensaje = sequelize.define('mensaje',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_producto:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'mensajes',
    timestamps: false
});
export default Mensaje;
