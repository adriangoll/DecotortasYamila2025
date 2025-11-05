import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios'

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/contacto', formData);
      
      if (response.data.success) {
        setEnviado(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: ''
        });
  
    //Ocultar mensaje exitoso despues de 4 segundos
      setTimeout(() => setEnviado(false), 4000);
      }
    } catch (err){ 
    console.error('Error al enviar mensaje:', err);
    setError(err.response?.data?.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
  } finally {
      setLoading(false);
    }
    
    // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setEnviado(false), 5000);
  }

return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
        Contactanos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información de contacto */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Información de Contacto
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-pink-500 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">contacto@decotortasyamila.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhone className="text-pink-500 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Teléfono / WhatsApp</h3>
                <p className="text-gray-600">+54 9 351 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-pink-500 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Dirección</h3>
                <p className="text-gray-600">Río Cuarto, Córdoba, Argentina</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Horarios de Atención</h3>
            <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
            <p className="text-gray-600">Sábados: 9:00 - 13:00</p>
            <p className="text-gray-600">Domingos: Cerrado</p>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Envianos tu Consulta
          </h2>

          {enviado && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ¡Mensaje enviado con éxito! Te responderemos pronto.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="+54 9 351 123 4567"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                placeholder="Escribí tu consulta aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;