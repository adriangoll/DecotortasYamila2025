import { useEffect, useState } from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';

const OrderCrud = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPedidos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/pedido');
      setPedidos(res.data);
    } catch (err) {
      console.error('Error al obtener pedidos', err);
      setError('Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:3000/api/pedido/${id}`, {
        estado: nuevoEstado
      });
      await fetchPedidos();
    } catch (err) {
      console.error('Error al actualizar estado', err);
      alert('Error al actualizar el estado del pedido');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este pedido?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/pedido/${id}`);
      await fetchPedidos();
    } catch (err) {
      console.error('Error al eliminar pedido', err);
      alert('Error al eliminar el pedido');
    }
  };

  if (loading) {
    return (
      <>
        <NavAdmin />
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavAdmin />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Administrar Pedidos</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {pedidos.length === 0 ? (
          <p className="text-gray-500">No hay pedidos registrados</p>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white p-4 rounded-lg shadow border"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-lg">Pedido #{pedido.id}</p>
                    <p className="text-sm text-gray-600">
                      Cliente: {pedido.cliente_nombre || 'Sin nombre'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Fecha: {new Date(pedido.fecha).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={pedido.estado}
                      onChange={(e) => handleCambiarEstado(pedido.id, e.target.value)}
                      className="border p-2 rounded"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="preparando">Preparando</option>
                      <option value="listo">Listo</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    
                    <button
                      onClick={() => handleEliminar(pedido.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="font-semibold mb-2">Productos:</p>
                  {pedido.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm mb-1">
                      <span>{item.producto_nombre} x{item.cantidad}</span>
                      <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${pedido.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCrud;