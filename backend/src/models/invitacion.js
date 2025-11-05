// import { DataTypes } from "sequelize";
// import sequelize from '../db/connection.js';

// const Invitacion = sequelize.define('invitacion',{
//     id:{
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique:true,
//         allowNull: false
//     },
//     id_usuario_emisor:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references:{
//             model: 'usuarios',
//             key: 'id'
//         }
//     },
//     id_usuario_receptor: {
//         type :DataTypes.INTEGER,
//         allowNull: false,
//         references:{
//             model: 'usuarios',
//             key: 'id'
//         }
//     },
//     fecha: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     puntos_ganados: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
// },{
//     tableName: 'invitaciones',
//     timestamps: true
// }
// );

// export default Invitacion;