import { DataTypes } from "sequelize";
import sequelize from "../config/conection.js";

const Producto = sequelize.define('producto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_categoria:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'categorias',
            key: 'id'
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagenes: {
        type: DataTypes.TEXT,  // Guardará JSON array de URLs
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('imagenes');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('imagenes', value ? JSON.stringify(value) : null);
    }
},
        kg: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        validate: {
            isFloat: {
                msg: "El peso debe ser un número válido"
            },
            min: {
                args: [0],
                msg: "El peso no puede ser negativo"
            }
        }
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isFloat: {
                msg: "El precio debe ser un número válido"
            },
            min: {
                args: [0],
                msg: "El precio no puede ser negativo"
            }
        }
    },
    personalizacion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        validate: {
            len: {
                args: [0, 255],
                msg: "La personalización no puede exceder los 255 caracteres"
            }
        }
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: "El descuento no puede ser negativo"
            },
            max: {
                args: [100],
                msg: "El descuento no puede ser mayor a 100%"
            }
        }
    },
    oferta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    
},{
    tableName: 'productos',
    timestamps: true
});

export default Producto