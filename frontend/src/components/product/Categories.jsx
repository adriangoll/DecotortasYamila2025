import{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categoria');
        setCategorias(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las categorías');
        setLoading(false);
        console.error('Error al cargar las categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  const handleCategoriaClick = (id) => {
    navigate(`/categoria/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Listado de Categorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categorias.length === 0 ? (
          <p className="text-gray-500">No hay categorías disponibles</p>
        ) : (
          categorias.map((categoria) => (
            <div 
              key={categoria.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
              onClick={() => handleCategoriaClick(categoria.id)}
            >
              <img 
                src={categoria.imagenUrl ? `http://localhost:3000${categoria.imagenUrl}` : 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                alt={categoria.nombre} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{categoria.nombre}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categorias;