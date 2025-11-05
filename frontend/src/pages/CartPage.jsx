import { useContext, useState } from 'react';
import CartContext from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { items, removeFromCart, updateQty, total, clearCart } = useContext(CartContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const [modalOpen, setModalOpen] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [purchasedTotal, setPurchasedTotal] = useState(0);
  const navigate = useNavigate();

  const handleFinalize = () => {
    // Capturamos snapshot antes de vaciar
    setPurchasedItems(items);
    setPurchasedTotal(total);
    // Limpiar carrito
    clearCart();
    // Mostrar modal y snackbar
    setModalOpen(true);
    setSnackbar({ open: true, message: 'Compra realizada. ¡Gracias por tu pedido!' });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });
  const handleCloseModal = () => setModalOpen(false);
  const handleGoHome = () => navigate('/');

  return (
    <div className="max-w-4xl mx-auto p-6">
      {items.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <Link to="/productos" className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600">
            Ver Productos
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Mi Carrito</h2>

          <div className="space-y-4">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                <img
  src={
    product.imagenes && product.imagenes.length > 0
      ? `http://localhost:3000/uploads/${product.imagenes[0]}`
      : product.imagen
      ? `http://localhost:3000/uploads/${product.imagen}`
      : 'https://via.placeholder.com/100x100?text=Sin+Imagen'
  }
                  alt={product.nombre}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.nombre}</h3>
                  <p className="text-pink-600 font-bold">${product.precio}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(product.id, Math.max(1, qty - 1))}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4">{qty}</span>
                  <button
                    onClick={() => updateQty(product.id, qty + 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold w-24 text-right">${(product.precio * qty).toFixed(2)}</p>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-pink-600">${total.toFixed(2)}</span>
            </div>

            <button onClick={handleFinalize} className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              Finalizar Compra
            </button>
          </div>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Modal resumen de compra */}
  <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Compra realizada</DialogTitle>
        <DialogContent dividers>
          <p className="mb-3">Gracias por tu compra. Resumen del pedido:</p>
          <div className="space-y-2">
            {purchasedItems && purchasedItems.length > 0 ? (
              purchasedItems.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between">
                  <div>{product.nombre} x {qty}</div>
                  <div>${(product.precio * qty).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <div>No hay artículos (el carrito fue vaciado).</div>
            )}
          </div>
          <div className="mt-4 font-semibold">Total: ${purchasedTotal.toFixed(2)}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Cerrar</Button>
          <Button onClick={() => { handleGoHome(); handleCloseModal(); }} variant="contained" color="primary">Volver al inicio</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CartPage;