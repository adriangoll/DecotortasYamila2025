import Slider from "../components/ui/Slider";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard"
import Hero from "../components/ui/Hero";
import Filters from "../components/product/Filters";
import { useState, useEffect } from "react";
import api from "../api";

function Home() {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({ search: "", categoriaId: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar productos UNA sola vez al montar la página
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const res = await api.get("/producto");
        const todos = res.data || [];
        setAllProducts(todos);
        // Inicial: mostrar los primeros 9 productos
        setProductosFiltrados(todos.slice(0, 9));
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Aplicar filtros en cliente cuando cambian los filtros sin volver a fetch
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;
    let filtrados = allProducts;
    if (filters.search) {
      filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.categoriaId) {
      filtrados = filtrados.filter(p => p.id_categoria === parseInt(filters.categoriaId));
    }
    setProductosFiltrados(filtrados.slice(0, 9));
    // no tocamos loading aquí para evitar mostrar spinner al tipear
  }, [filters, allProducts]);

  const handleFilter = ({ search, categoriaId }) => {
    setFilters({ search, categoriaId });
  };

    if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <main className="bg-pink-100 w-full m-0">
      <Hero />
      <Slider />
      <div className="max-w-6xl mx-auto p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Filters onFilter={handleFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))
          ) : (
            <p>No se encontraron productos</p>
          )}
        </div>
        {/* Botón Ver Todos los Productos */}
                <div className="text-center mt-8">
                  <Link 
                    to="/productos"
                    className="inline-block bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition font-semibold text-lg shadow-md"
                  >Ver todos los productos</Link>
                </div>
      </div>
    </main>
  );
}

export default Home;