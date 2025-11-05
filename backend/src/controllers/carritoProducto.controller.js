import { CarritoProducto } from "../models/index.js";

// Obtener todas los carritoProductos
export const getCarritoProducto = async (req, res) => {
  try {
    const carritoProducto = await CarritoProducto.findAll();
    res.status(200).json(carritoProducto);
  } catch (error) {
    console.error("Error al obtener carritoProducto:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener una carritoProducto por ID
export const getCarritoProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const carritoProducto = await CarritoProducto.findByPk(id);
    if (carritoProducto) {
      res.status(200).json(carritoProducto);
    } else {
      res.status(404).json({ message: "carritoProducto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener carritoProducto por id:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nueva carritoProducto
export const createCarritoProducto = async (req, res) => {
  try {
    const nuevoCarritoProducto = await CarritoProducto.create(req.body);
    res.status(201).json(nuevoCarritoProducto);
  } catch (error) {
    console.error("Error al crear carritoProducto", error);
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

// Actualizar carritoProducto
export const updateCarritoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const carritoProducto = await CarritoProducto.findByPk(id);

    if (carritoProducto) {
      const carritoProductoActualizado = await CarritoProducto.update(req.body);
      res.status(200).json(carritoProductoActualizado);
    } else {
      res.status(404).json({ message: "carritoProducto no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar la carritoProducto", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar carritoProducto
export const deleteCarritoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await CarritoProducto.destroy({ where: { id } });

    if (resultado > 0) {
      res.status(200).json({ message: "carritoProducto eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "carritoProducto no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar carritoProducto", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
