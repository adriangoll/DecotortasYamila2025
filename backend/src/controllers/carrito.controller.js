import { Carrito } from "../models/index.js";

// Obtener todos los carritos
export const getCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findAll();
    res.status(200).json(carrito);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener un carrito por ID
export const getCarritoById = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);
    if (carrito) {
      res.status(200).json(carrito);
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener carrito por id:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nuevo carrito
export const createCarrito = async (req, res) => {
  try {
    const nuevaCarrito = await Carrito.create(req.body);
    res.status(201).json(nuevaCarrito);
  } catch (error) {
    console.error("Error al crear carrito", error);
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

// Actualizar carrito
export const updateCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);

    if (carrito) {
      const carritoActualizado = await carrito.update(req.body);
      res.status(200).json(carritoActualizado);
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar la carrito", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar carrito
export const deleteCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Carrito.destroy({ where: { id } });

    if (resultado > 0) {
      res.status(200).json({ message: "Carrito eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar carrito", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
