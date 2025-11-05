import { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "./NavAdmin";

const CategoriasAdmin = () => {
  const [categorias, setCategorias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
    imagenFile: null
  });

  const [editandoId, setEditandoId] = useState(null);
  const [editandoCategoria, setEditandoCategoria] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
    imagenFile: null
  });

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categoria");
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al obtener categorías", error);
      setError("Error al cargar categorías");
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', nuevaCategoria.nombre.trim());
      formData.append('descripcion', nuevaCategoria.descripcion.trim());
      
      if (nuevaCategoria.imagenFile) {
        formData.append('imagen', nuevaCategoria.imagenFile);
      } else if (nuevaCategoria.imagenUrl) {
        formData.append('imagen', nuevaCategoria.imagen);
      }

      await axios.post("http://localhost:3000/api/categoria", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await fetchCategorias();
      setSuccess("¡Categoría creada exitosamente!");
      setNuevaCategoria({ nombre: "", descripcion: "", imagenUrl: "", imagenFile: null });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al crear categoría", error);
      setError("Error al crear categoría");
    }
  };

  const handleEditar = (categoria) => {
    setEditandoId(categoria.id);
    setEditandoCategoria({
      nombre: categoria.nombre || "",
      descripcion: categoria.descripcion || "",
      imagen: categoria.imagenUrl || "",
      imagenFile: null
    });
  };

  const handleGuardarEdicion = async (id) => {
    if (!editandoCategoria.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', editandoCategoria.nombre.trim());
      formData.append('descripcion', editandoCategoria.descripcion.trim());

      if (editandoCategoria.imagenFile) {
        formData.append('imagenUrl', editandoCategoria.imagenFile);
      } else if (editandoCategoria.imagen) {
        formData.append('imagenUrl', editandoCategoria.imagenUrl);
      }

      await axios.put(`http://localhost:3000/api/categoria/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await fetchCategorias();
      setSuccess("¡Categoría actualizada exitosamente!");
      setEditandoId(null);
      setEditandoCategoria({ nombre: "", descripcion: "", imagenUrl: "", imagenFile: null });
    } catch (error) {
      console.error("Error al actualizar categoría", error);
      setError("Error al actualizar categoría");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/categoria/${id}`);
      await fetchCategorias();
      setSuccess("Categoría eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar categoría", error);
      setError("Error al eliminar categoría");
    }
  };

  return (
    <>
      <NavAdmin />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Administrar Categorías</h2>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            {mostrarFormulario ? '✕ Cancelar' : '+ Nueva Categoría'}
          </button>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Formulario crear nueva categoría */}
        {mostrarFormulario && (
          <form onSubmit={handleCrear} className="bg-white p-6 rounded-lg mb-6 shadow-md border">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Crear Nueva Categoría</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                value={nuevaCategoria.nombre}
                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                placeholder="Nombre *"
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                value={nuevaCategoria.descripcion}
                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                placeholder="Descripción"
                className="w-full border p-2 rounded"
                rows="3"
              />

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setNuevaCategoria({ ...nuevaCategoria, imagenFile: file });
                  }
                }}
                className="border-dashed border-2 border-gray-300 rounded p-4 text-center"
              >
                <label className="block text-sm font-medium mb-2">Imagen de la categoría</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNuevaCategoria({ ...nuevaCategoria, imagenFile: file });
                    }
                  }}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">O arrastra una imagen aquí</p>

                {nuevaCategoria.imagenFile && (
                  <img
                    src={URL.createObjectURL(nuevaCategoria.imagenFile)}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-cover rounded mx-auto"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Crear Categoría
              </button>
            </div>
          </form>
        )}

        {/* Tabla de categorías */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No hay categorías registradas
                  </td>
                </tr>
              ) : (
                categorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    {editandoId === cat.id ? (
                      <td colSpan="4" className="px-6 py-4">
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editandoCategoria.nombre}
                            onChange={(e) => setEditandoCategoria({ ...editandoCategoria, nombre: e.target.value })}
                            className="w-full border p-2 rounded"
                            placeholder="Nombre"
                          />

                          <textarea
                            value={editandoCategoria.descripcion}
                            onChange={(e) => setEditandoCategoria({ ...editandoCategoria, descripcion: e.target.value })}
                            className="w-full border p-2 rounded"
                            placeholder="Descripción"
                            rows="3"
                          />

                          <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files[0];
                              if (file) {
                                setEditandoCategoria({ ...editandoCategoria, imagenFile: file });
                              }
                            }}
                            className="border-dashed border-2 border-gray-300 rounded p-4 text-center"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setEditandoCategoria({ ...editandoCategoria, imagenFile: file });
                                }
                              }}
                              className="w-full"
                            />
                            <p className="text-xs text-gray-500 mt-1">O arrastra una imagen aquí</p>

                            {editandoCategoria.imagenFile ? (
                              <img
                                src={URL.createObjectURL(editandoCategoria.imagenFile)}
                                alt="Preview"
                                className="mt-4 w-32 h-32 object-cover rounded mx-auto"
                              />
                            ) : editandoCategoria.imagenUrl ? (
                              <img
                                src={editandoCategoria.imagenUrl}
                                alt="Actual"
                                className="mt-4 w-32 h-32 object-cover rounded mx-auto"
                              />
                            ) : null}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleGuardarEdicion(cat.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditandoId(null)}
                              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          {cat.imagenUrl ? (
                            <img
                              src={`http://localhost:3000${cat.imagenUrl}`}
                              alt={cat.nombre}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                              Sin img
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{cat.nombre}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{cat.descripcion || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditar(cat)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleEliminar(cat.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoriasAdmin;