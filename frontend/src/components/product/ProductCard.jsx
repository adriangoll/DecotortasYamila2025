import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import CartContext from '../../contexts/CartContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ProductCard({ producto }) {
  const { addToCart } = useContext(CartContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const getImageUrl = () => {
    try {
      // Preferimos el array que devuelve el getter del modelo
      if (Array.isArray(producto.imagenes) && producto.imagenes.length > 0) {
        return `http://localhost:3000/uploads/${producto.imagenes[0]}`;
      }

      // Si existe campo individual 'imagen' (compatibilidad)
      if (producto.imagen) {
        return `http://localhost:3000/uploads/${producto.imagen}`;
      }

      // Fallback
      return 'https://via.placeholder.com/300';
    } catch (error) {
      console.error('Error al procesar imagen:', error);
      return 'https://via.placeholder.com/300';
    }
  };

  const handleAdd = () => {
    addToCart(producto, 1);
    setSnackbar({ open: true, message: `${producto.nombre} agregado al carrito` });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition">
      <Link to={`/productos/${producto.id}`} className="block">
        <img
          src={getImageUrl()}
          alt={producto.nombre}
          className="w-full h-48 object-cover rounded hover:scale-105 transition"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
      </Link>

      <div className="mt-3 flex-1 flex flex-col">
        <Link to={`/productos/${producto.id}`} className="hover:text-pink-600 transition">
          <h2 className="text-lg font-bold">{producto.nombre}</h2>
        </Link>

        <p className="text-gray-600 mt-1 line-clamp-2">{producto.descripcion}</p>
        <p className="text-pink-600 font-bold text-xl mt-2">${producto.precio}</p>

        <div className="mt-auto">
          <button onClick={handleAdd} className="mt-3 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">
            Agregar al carrito
          </button>
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

export default ProductCard;
