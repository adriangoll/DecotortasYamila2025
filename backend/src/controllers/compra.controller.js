import { Compra } from "../models/index.js";

// Obtener todas las compras
export const getCompra = async (req, res) => {
  try {
    const compra = await Compra.findAll();
    res.status(200).json(compra);
  } catch (error) {
    console.error("Error al obtener compra:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener una compra por ID
export const getCompraById = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await Compra.findByPk(id);
    if (compra) {
      res.status(200).json(compra);
    } else {
      res.status(404).json({ message: "Compra no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener compra por id:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nueva compra
export const createCompra = async (req, res) => {
  try {
    const nuevaCompra = await Compra.create(req.body);
    res.status(201).json(nuevaCompra);
  } catch (error) {
    console.error("Error al crear compra", error);
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

// Actualizar compra
export const updateCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await Compra.findByPk(id);

    if (compra) {
      const compraActualizado = await compra.update(req.body);
      res.status(200).json(compraActualizado);
    } else {
      res.status(404).json({ message: "Compra no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar la compra", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar compra
export const deleteCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Compra.destroy({ where: { id } });

    if (resultado > 0) {
      res.status(200).json({ message: "Compra eliminada exitosamente" });
    } else {
      res.status(404).json({ message: "Compra no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar compra", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
