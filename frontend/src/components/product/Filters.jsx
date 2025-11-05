import { useState, useEffect } from "react";
import api from "../../api";

function Filters({ onFilter }) {
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    api.get("/categoria")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Error al cargar categorías", err));
  }, []);

  const handleFilter = () => {
    if (onFilter) onFilter({ search, categoriaId });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white shadow rounded-md mb-6">
      <input
        type="text"
        placeholder="Buscar producto..."
        className="border p-2 rounded flex-1"
        value={search}
        onChange={(e) => {
          const v = e.target.value;
          setSearch(v);
          if (onFilter) onFilter({ search: v, categoriaId });
        }}
        onKeyDown={(e) => { if (e.key === 'Enter') handleFilter(); }}
      />

      <select
        className="border p-2 rounded"
        value={categoriaId}
        onChange={(e) => {
          const v = e.target.value;
          setCategoriaId(v);
          if (onFilter) onFilter({ search, categoriaId: v });
        }}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <button
        onClick={handleFilter}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
