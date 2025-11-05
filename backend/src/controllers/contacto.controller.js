import { enviarEmailDeContacto, enviarConfirmacionUsuario } from '../config/emailConfig.js';


// Controlador para manejar el formulario de contacto
const enviarMensajeContacto = async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y mensaje son obligatorios'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    console.log('📧 Procesando mensaje de contacto de:', nombre);

    // Enviar email al administrador
    const resultadoAdmin = await enviarEmailDeContacto({
      nombre,
      email,
      telefono,
      mensaje
    });

    if (!resultadoAdmin.success) {
      console.error('Error enviando email al admin:', resultadoAdmin.error);
      return res.status(500).json({
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
      });
    }

    // Enviar confirmación al usuario
    await enviarConfirmacionUsuario(email, nombre);

    console.log('✅ Emails enviados exitosamente');

    res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te responderemos pronto.'
    });

  } catch (error) {
    console.error('❌ Error en controlador de contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export default enviarMensajeContacto;