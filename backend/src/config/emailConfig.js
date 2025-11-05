import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const enviarEmailDeContacto = async(datosContacto) => {
    const { nombre, email, telefono, mensaje } = datosContacto;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
        subjet: `Nuevo mensaje de contacto ${nombre}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fce4ec; border-radius: 10px;">
        <h2 style="color: #880e4f;">Nuevo Mensaje de Contacto</h2>
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 10px;">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
          <hr>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${mensaje}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          Este mensaje fue enviado desde el formulario de contacto de Decotortas Yamila
        </p>
      </div>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ' + info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error al enviar email: ', error);
        return { success: false, error: error.message };
    }
};

    //Funcion para enviar confirmcion al usuario
    const enviarConfirmacionUsuario = async (emailUsuario, nombre)=> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailUsuario,
            subject: 'Recibimos tu mensaje, gracias!!! - Decotortas Yamila',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fce4ec; border-radius: 10px;">
        <h2 style="color: #880e4f;">¡Gracias por tu mensaje, ${nombre}!</h2>
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 10px;">
            <p>Hemos recibido tu consulta y te responderemos a la brevedad.</p>
            <p>Nuestro horario de atención es:</p>
            <ul>
            <li>Lunes a Viernes: 9:00 - 18:00</li>
            <li>Sábados: 9:00 - 13:00</li>
            </ul>
            <p style="margin-top: 20px;">
            También podés contactarnos por WhatsApp: 
            <a href="https://wa.me/5493511234567" style="color: #e91e63;">+54 9 351 123 4567</a>
            </p>
        </div>
        <p style="margin-top: 20px; text-align: center;">
            <strong style="color: #880e4f;">Decotortas Yamila</strong><br>
            <span style="font-size: 12px; color: #666;">Las mejores tortas de Río Cuarto</span>
        </p>
      </div>
    `
  };
  try{
  const info = await transporter.sendMail(mailOptions);
  console.log('Confirmacion enviada al Usuario');
  return {success: true};
 } catch(error){
    console.error ('Error al envia confirmacion al usuario: ', error);
 } 
 return {success: false, error: error.message};
};

export{ enviarEmailDeContacto,
    enviarConfirmacionUsuario};
