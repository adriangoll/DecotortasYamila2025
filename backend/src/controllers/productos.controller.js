import { where } from "sequelize";
import { Producto } from "../models/index.js";
import { Where } from "sequelize/lib/utils";

// Obtener todos los Productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener Productos:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener Producto por id:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nuevo Producto
export const createProducto = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Manejar una sola imagen (campo 'imagen') - MVP
    if (req.file) {
      // Guardamos como array con un solo elemento para seguir usando el getter/setter del modelo
      data.imagenes = [req.file.filename];
    } else {
      // Si no se envía imagen, no forzamos cambios aquí (dejamos lo que venga en req.body)
    }

    const nuevoProducto = await Producto.create(data);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear Producto", error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Actualizar Producto
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    
    // Obtener producto existente
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

     // Manejar nueva imagen (reemplaza la actual)
    if (req.file) {
      data.imagenes = [req.file.filename];
    }

      // Actualizar producto
    await producto.update(data);
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al actualizar Producto:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar Producto
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Producto.destroy({ where: { id } });

    if (resultado > 0) {
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
