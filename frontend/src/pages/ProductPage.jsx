import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Filters from '../components/product/Filters';
import ProductGrid from '../components/product/ProductGrid';
import Pagination from '../components/ui/Pagination';

export default function ProductPage() {
  const { id: categoriaIdUrl } = useParams(); // Obtener ID de categoría de la URL
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [filters, setFilters] = useState({ 
    search: '', 
    categoriaId: categoriaIdUrl || '' // Iniciar con la categoría de la URL
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 9;

  // Cargar todos los productos una sola vez
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const res = await api.get('/producto');
        setTodosLosProductos(res.data);
      } catch (err) {
        console.error('Error al cargar productos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Actualizar filtros cuando cambia la categoría en la URL
  useEffect(() => {
    if (categoriaIdUrl) {
      setFilters(prev => ({ ...prev, categoriaId: categoriaIdUrl }));
    }
  }, [categoriaIdUrl]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    let filtrados = todosLosProductos;

    // Filtro de búsqueda
    if (filters.search) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro de categoría
    if (filters.categoriaId) {
      filtrados = filtrados.filter(p =>
        p.id_categoria === parseInt(filters.categoriaId)
      );
    }

    setProductosFiltrados(filtrados);
    setPage(1); // Volver a la página 1 cuando cambian los filtros
  }, [filters, todosLosProductos]);

  const handleFilter = (f) => {
    setFilters(f);
  };

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular productos de la página actual
  const totalPages = Math.ceil(productosFiltrados.length / limit);
  const startIndex = (page - 1) * limit;
  const productosActuales = productosFiltrados.slice(startIndex, startIndex + limit);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>
      <Filters onFilter={handleFilter} />
      
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <>
          <ProductGrid productos={productosActuales} />
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}