import { Usuario } from "../models/index.js";

// Obtener todas los Usuarios
export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener Usuario:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener una Usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener Usuario por id:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nuevo Usuario
export const createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear Usuario", error);
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

// Actualizar Usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      const usuarioActualizado = await Usuario.update(req.body);
      res.status(200).json(usuarioActualizado);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar la Usuario", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar Usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Usuario.destroy({ where: { id } });

    if (resultado > 0) {
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar Usuario", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};