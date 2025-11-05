import { Categoria } from "../models/index.js";

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener categoría por id:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nueva categoría
export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Capturamos la imagen subida si existe
    let imagenUrl = null;
    if (req.file) {
      imagenUrl = `/uploads/${req.file.filename}`;
      console.log("📸 Imagen recibida:", imagenUrl);
    } else {
      console.log("⚠️ No se recibió archivo en la creación");
    }

    const nuevaCategoria = await Categoria.create({
      nombre,
      descripcion,
      imagenUrl,
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// Actualizar categoría
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const { nombre, descripcion } = req.body;
    const dataActualizada = { nombre, descripcion };

    // Si viene nueva imagen, reemplazamos la anterior
    if (req.file) {
      dataActualizada.imagenUrl = `/uploads/${req.file.filename}`;
      console.log("📸 Nueva imagen subida:", dataActualizada.imagenUrl);
    }

    const categoriaActualizada = await categoria.update(dataActualizada);
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error("❌ Error al actualizar categoría:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// Eliminar categoría
export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Categoria.destroy({ where: { id } });

    if (resultado > 0) {
      res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar categoría", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
