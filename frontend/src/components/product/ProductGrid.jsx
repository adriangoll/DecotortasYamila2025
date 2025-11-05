import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import CartContext from '../../contexts/CartContext';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


function ProductGrid({ productos = [] }) {
  const { addToCart } = useContext(CartContext);
  const [expandedId, setExpandedId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: ''});

  const handleAddToCart = (producto) => {
    addToCart(producto, 1);
    setSnackbar({ open: true,
      message: `${producto.nombre} agregado al carrito` });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {productos.length > 0 ? (
        productos.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
            <Link to={`/productos/${p.id}`}>
              <img
                src={
                  Array.isArray(p.imagenes) && p.imagenes.length > 0
                    ? `http://localhost:3000/uploads/${p.imagenes[0]}`
                    : p.imagen
                    ? `http://localhost:3000/uploads/${p.imagen}`
                    : 'https://via.placeholder.com/300'
                }
                alt={p.nombre}
                className="w-full h-48 object-cover hover:scale-105 transition"
              />
            </Link>
            
            <div className="p-4 flex-1 flex flex-col">
              <Link to={`/productos/${p.id}`}>
                <h3 className="text-lg font-semibold mb-1 hover:text-pink-600 transition">
                  {p.nombre}
                </h3>
              </Link>

              {/* Descripción colapsable */}
              <div className="mb-2">
                <p className={`text-gray-600 text-sm ${expandedId === p.id ? '' : 'line-clamp-2'}`}>
                  {p.descripcion}
                </p>
                {p.descripcion && p.descripcion.length > 70 && (
                  <button
                    onClick={() => toggleDescription(p.id)}
                    className="text-pink-500 text-xs font-medium mt-1 hover:text-pink-600 transition"
                  >
                    {expandedId === p.id ? 'Ver menos' : 'Ver más'}
                  </button>
                )}
              </div>

              <div className="mt-auto">
                <p className="text-pink-600 font-bold text-xl mb-3">
                  ${p.precio}
                  {p.oferta && p.descuento > 0 && (
                    <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                      {p.descuento}% OFF
                    </span>
                  )}
                </p>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full transition font-medium"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No hay productos disponibles
        </p>
      )}

      
      {/* Notificación cuando se agrega al carrito */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' ,backgroundColor: '#fce4ec',
    color: '#880e4f',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.1rem',    
    fontWeight: 500,
    py: 2,                  // padding vertical (más alto)
    px: 3,                  // padding horizontal
    borderRadius: 2,        
    '& .MuiAlert-icon': {
      color: '#e91e63'}
    }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductGrid;