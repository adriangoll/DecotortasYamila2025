import Mensaje from "../models/mensajes.js";
import Producto from "../models/productos.js";

// Obtener todos los mensajes
export const getMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.findAll({
      include: { model: Producto, as: "producto" },
      order: [["id", "ASC"]],
    });
    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Obtener mensajes por ID de producto
export const getMensajesByProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const mensajes = await Mensaje.findAll({
      where: { id_producto },
      order: [["id", "ASC"]],
    });
    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener mensajes por producto:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Crear nuevo mensaje
export const createMensaje = async (req, res) => {
  try {
    const { texto, id_producto } = req.body;

    if (!texto || !id_producto) {
      return res.status(400).json({ message: "Texto e id_producto son obligatorios" });
    }

    const nuevoMensaje = await Mensaje.create({ texto, id_producto });
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar mensaje
export const deleteMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Mensaje.destroy({ where: { id } });

    if (eliminado > 0) {
      res.status(200).json({ message: "Mensaje eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Mensaje no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar mensaje:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
