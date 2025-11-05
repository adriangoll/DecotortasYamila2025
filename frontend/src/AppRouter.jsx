import { Route, Routes, Navigate } from 'react-router-dom';
import Categorias from './components/product/Categories';
import ProductoDetalle from './components/product/ProductDetail';
import Admin from './admin/AdminDashboard';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/ui/Layout';
import CrudProductos from './admin/ProductCrud';
import CrudCategorias from './admin/CategoryCrud';
import OrderCrud from './admin/OrderCrud';
import LoginAdmin from './admin/AdminLogin';
import LoginPage from './pages/LoginPage';

function PrivateRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

export const RouterApp = () => {
  return (
    <Routes>
      {/* Login de admin (público) */}
      <Route path="/admin/login" element={<LoginAdmin />} />
      
      {/* Rutas protegidas de administrador */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/productos"
        element={
          <PrivateRoute>
            <CrudProductos />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/categorias"
        element={
          <PrivateRoute>
            <CrudCategorias />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/pedidos"
        element={
          <PrivateRoute>
            <OrderCrud />
          </PrivateRoute>
        }
      />

      {/* Rutas públicas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categoria/:id" element={<ProductPage />} />
        <Route path="productos" element={<ProductPage />} />
        <Route path="productos/:id" element={<ProductoDetalle />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};