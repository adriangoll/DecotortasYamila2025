// imports
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import CartContext from '../../contexts/CartContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Componente para mostrar detalle de producto y manejar agregar al carrito
function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [imagenPrincipal, setImagenPrincipal] = useState(0); // Índice de la imagen principal

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductoYMensajes = async () => {
      try {
        if (!id) {
          setError('ID de producto inválido');
          setLoading(false);
          return;
        }
        const productoResponse = await api.get(`/producto/${id}`);
        setProducto(productoResponse.data);

        try {
          const mensajesResponse = await api.get(`/mensajes/${id}/mensajes`);
          setMensajes(mensajesResponse.data);
        } catch {
          setMensajes([]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar la información del producto.');
        setLoading(false);
      }
    };

    fetchProductoYMensajes();
  }, [id]);

  const handleAddToCart = (producto) => {
    if (!producto) return;
    addToCart(producto, 1);
    setSnackbar({ open: true, message: `${producto.nombre} agregado al carrito` });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (loading) return <div className="text-center p-4">Cargando producto...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!producto) return <div className="text-center p-4">Producto no encontrado.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Columna izquierda: imagen(es) */}
        <div>
          {(() => {
            // Utilidad robusta para obtener array de imágenes desde distintas formas
            const getImagenesArray = (p) => {
              try {
                if (!p) return [];

                // Si ya viene como array (getter de Sequelize puede devolver array)
                if (Array.isArray(p.imagenes)) return p.imagenes;

                // Si viene como string JSON válido
                if (typeof p.imagenes === 'string' && p.imagenes.trim() !== '' && p.imagenes !== 'null') {
                  try {
                    const parsed = JSON.parse(p.imagenes);
                    if (Array.isArray(parsed)) return parsed;
                  } catch (e) {
                    // Si no se puede parsear, intentamos extraer nombres de archivo (png/jpg/jpeg/gif/webp)
                    const matches = p.imagenes.match(/([\w\-]+\.(?:png|jpg|jpeg|gif|webp))/gi);
                    if (matches && matches.length > 0) return matches;
                  }
                }

                // Si existe campo individual 'imagen'
                if (p.imagen && typeof p.imagen === 'string' && p.imagen.trim() !== '' && p.imagen !== 'null') {
                  return [p.imagen];
                }

                return [];
              } catch (err) {
                console.error('getImagenesArray error:', err);
                return [];
              }
            };

            const imagenes = getImagenesArray(producto);

            if (imagenes.length > 0) {
              return (
                <div className="space-y-4">
                  {/* Imagen Principal */}
                  <div className="w-full">
                    <img
                      src={`http://localhost:3000/uploads/${imagenes[imagenPrincipal]}`}
                      alt={`${producto.nombre} - Principal`}
                      className="w-full h-96 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300';
                      }}
                    />
                  </div>

                  {/* Miniaturas */}
                  {imagenes.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {imagenes.map((img, i) => (
                        <img
                          key={i}
                          src={`http://localhost:3000/uploads/${img}`}
                          alt={`${producto.nombre} ${i + 1}`}
                          className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all
                            ${i === imagenPrincipal ? 'border-2 border-pink-500' : 'border border-gray-200 hover:border-pink-300'}`}
                          onClick={() => setImagenPrincipal(i)}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300';
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div className="w-full h-96 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            );
          })()}
        </div>

        {/* Columna derecha: información y acciones */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
          <p className="text-2xl text-pink-600 font-bold mb-4">${producto.precio}</p>
          <p className="text-gray-700 mb-6">{producto.descripcion}</p>

          <div className="mt-auto">
            <button
              onClick={() => handleAddToCart(producto)}
              className="w-full bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300"
            >
              Agregar al carrito
            </button>
          </div>

          {/* Mensajes (solo lectura) */}
          <h2 className="text-xl font-semibold mt-6 mb-3">Mensajes de los clientes</h2>
          {mensajes.length > 0 ? (
            <div className="space-y-3">
              {mensajes.map((mensaje) => (
                <p key={mensaje.id} className="bg-gray-100 p-3 rounded-md">
                  {mensaje.texto}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay mensajes para este producto aún.</p>
          )}
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductoDetalle;
