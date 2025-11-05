import { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "./NavAdmin";

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0); // índice de la imagen seleccionada
  const [success, setSuccess] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Formulario de creación
  const [formData, setFormData] = useState({
    nombre: "",
    id_categoria: "",
    descripcion: "",
    precio: "",
    imagen: null,
    imagenFiles: [],
    personalizacion: "",
    kg: null,
    oferta: false,
    descuento: null
  });

  // Edición
  const [editandoId, setEditandoId] = useState(null);
  const [editandoProducto, setEditandoProducto] = useState({
    nombre: "",
    id_categoria: "",
    descripcion: "",
    precio: "",
    imagen: "",
    imagenes: [], // URLs existentes
    imagenFiles: [], // nuevos archivos a subir
    personalizacion: "",
    kg: null,
    oferta: false,
    descuento: null,
  });

  // Cargar productos y categorías
  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/producto");
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar productos");
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categoria");
      setCategorias(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Crear producto
  const handleCrear = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones
    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!formData.id_categoria) {
      setError("Debes seleccionar una categoría");
      return;
    }
    if (!formData.descripcion.trim()) {
      setError("La descripción es obligatoria");
      return;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre.trim());
    formDataToSend.append('id_categoria', parseInt(formData.id_categoria));
    formDataToSend.append('descripcion', formData.descripcion.trim());
    formDataToSend.append('precio', parseFloat(formData.precio));
    formDataToSend.append('personalizacion', formData.personalizacion?.trim() || null);
    formDataToSend.append('kg', formData.kg || null);
    formDataToSend.append('oferta', formData.oferta);
    formDataToSend.append('descuento', formData.descuento || null);

    // Adjuntar la primera imagen si el usuario seleccionó archivos (MVP: 1 imagen)
    if (formData.imagenFiles && formData.imagenFiles.length > 0) {
      const first = formData.imagenFiles[0];
      formDataToSend.append('imagen', first);
    }

  try {
    await axios.post("http://localhost:3000/api/producto", formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
      
      await fetchProductos();
      setSuccess("¡Producto creado exitosamente!");
      setMostrarFormulario(false);
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        id_categoria: "",
        descripcion: "",
        precio: "",
        imagen: null,
        imagenFiles: [],
        personalizacion: "",
        kg: null,
        oferta: false,
        descuento: null,
      });
    } catch (err) {
      console.error("Error completo:", err.response?.data || err);
      setError(err.response?.data?.message || "Error al crear producto");
    }
  };

  // Editar producto
  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setEditandoProducto({
      nombre: prod.nombre || "",
      id_categoria: prod.id_categoria || "",
      descripcion: prod.descripcion || "",
      precio: prod.precio || "",
      imagen: prod.imagen || "",
      imagenes: prod.imagenes || (prod.imagen ? [prod.imagen] : []),
      imagenFiles: [],
      personalizacion: prod.personalizacion || "",
      kg: prod.kg || null,
      oferta: prod.oferta || false,
      descuento: prod.descuento || null,
    });
  };

  // Guardar edición
  const handleGuardarEdicion = async (id) => {
    setError("");
    setSuccess("");

    if (!editandoProducto.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!editandoProducto.id_categoria) {
      setError("La categoría es obligatoria");
      return;
    }
    if (!editandoProducto.descripcion.trim()) {
      setError("La descripción es obligatoria");
      return;
    }
    if (!editandoProducto.precio || parseFloat(editandoProducto.precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    const productoData = {
      nombre: editandoProducto.nombre.trim(),
      id_categoria: parseInt(editandoProducto.id_categoria),
      descripcion: editandoProducto.descripcion.trim(),
      precio: parseFloat(editandoProducto.precio),
      imagen: editandoProducto.imagen.trim() || "https://via.placeholder.com/300",
      personalizacion: editandoProducto.personalizacion?.trim() || null,
      kg: editandoProducto.kg ? (isNaN(parseFloat(editandoProducto.kg)) ? 0 : parseFloat(editandoProducto.kg)) : 0,
      oferta: editandoProducto.descuento > 0,
      descuento: editandoProducto.descuento ? parseFloat(editandoProducto.descuento) : 0,
    };

    console.log("Actualizando producto:", productoData);

    try {
      let response;
        // Si el usuario adjuntó archivos en la edición, enviamos multipart/form-data con múltiples imágenes
      if (editandoProducto.imagenFiles && editandoProducto.imagenFiles.length > 0) {
        const fd = new FormData();
        fd.append('nombre', productoData.nombre);
        fd.append('id_categoria', productoData.id_categoria);
        fd.append('descripcion', productoData.descripcion);
        fd.append('precio', productoData.precio);
        fd.append('personalizacion', productoData.personalizacion || "");
        fd.append('kg', productoData.kg === null || isNaN(productoData.kg) ? 0 : productoData.kg);
        fd.append('oferta', productoData.oferta);
        fd.append('descuento', productoData.descuento || 0);

        // Adjuntar solo la primera imagen (MVP)
        const first = editandoProducto.imagenFiles[0];
        if (first) fd.append('imagen', first);
        response = await axios.put(`http://localhost:3000/api/producto/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Si no hay archivos nuevos, enviamos JSON con todas las imágenes existentes
        const payload = { ...productoData };
        
        // Asegurarnos de incluir todas las imágenes existentes
        if (editandoProducto.imagenes && editandoProducto.imagenes.length > 0) {
          payload.imagenes = editandoProducto.imagenes;
        }
        
        // Mantener compatibilidad con el campo imagen si no hay múltiples imágenes
        if (!payload.imagen && payload.imagenes && payload.imagenes.length > 0) {
          payload.imagen = payload.imagenes[0];
        }

        response = await axios.put(`http://localhost:3000/api/producto/${id}`, payload, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      console.log("Respuesta del servidor:", response.data);
      await fetchProductos();
      setSuccess("¡Producto actualizado exitosamente!");
      setEditandoId(null);
      setEditandoProducto({
        nombre: "",
        id_categoria: "",
        descripcion: "",
        precio: "",
        imagen: "",
        imagenes: [],
        imagenFiles: [],
        personalizacion: "",
        kg: 0,
        oferta: false,
        descuento: 0,
      });
    } catch (err) {
      console.error("Error completo:", err.response?.data || err);
      setError(err.response?.data?.message || "Error al actualizar producto");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/producto/${id}`);
      await fetchProductos();
      setSuccess("Producto eliminado exitosamente");
    } catch (err) {
      console.error(err);
      setError("Error al eliminar producto");
    }
  };
  const getCategoriaName = (id) => {
    const cat = categorias.find(c => c.id === id);
    return cat ? cat.nombre : 'Sin categoría';
  };

  return (
    <>
      <NavAdmin />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Administrar Productos</h2>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            {mostrarFormulario ? '✕ Cancelar' : '+ Nuevo Producto'}
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

        {/* Formulario de creación */}
        {mostrarFormulario && (
          <form onSubmit={handleCrear} className="bg-white p-6 rounded-lg mb-6 shadow-md border">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Crear Nuevo Producto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre *"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <select
                value={formData.id_categoria}
                onChange={(e) => setFormData({ ...formData, id_categoria: e.target.value })}
                className="border p-2 rounded"
                required
              >
                <option value="">Seleccionar categoría *</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>

              <input
                type="number"
                step="0.01"
                placeholder="Precio *"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <div className="md:col-span-2">
  <label className="block text-sm font-medium mb-2">Imagen del producto</label>
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files || []);
      if (files.length > 0) {
        setFormData({ ...formData, imagenFiles: [...(formData.imagenFiles || []), ...files] });
      }
    }}
    className="border-dashed border-2 border-gray-300 rounded p-4 text-center"
  >
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
          setFormData({ ...formData, imagenFiles: [...(formData.imagenFiles || []), ...files] });
        }
      }}
      className="w-full"
    />
    <p className="text-xs text-gray-500 mt-1">O arrastra una imagen aquí</p>

    {formData.imagenFiles && formData.imagenFiles.length > 0 && (
      <div className="mt-4 space-y-4">
        {/* Vista principal */}
        <div className="relative w-full max-w-xl mx-auto">
          <img
            src={URL.createObjectURL(formData.imagenFiles[selectedImage])}
            alt="Vista principal"
            className="w-full h-64 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Miniaturas con botones de eliminar */}
        <div className="flex gap-2 flex-wrap justify-center">
          {formData.imagenFiles.map((file, idx) => (
            <div key={idx} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                  selectedImage === idx ? 'ring-2 ring-pink-500' : 'hover:ring-2 hover:ring-gray-300'
                }`}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newFiles = formData.imagenFiles.filter((_, index) => index !== idx);
                  setFormData({ ...formData, imagenFiles: newFiles });
                  if (selectedImage >= newFiles.length) {
                    setSelectedImage(Math.max(0, newFiles.length - 1));
                  }
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                title="Eliminar imagen"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

              <textarea
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="border p-2 rounded md:col-span-2"
                rows="2"
              />

              <input
                type="text"
                placeholder="Personalización"
                value={formData.personalizacion}
                onChange={(e) => setFormData({ ...formData, personalizacion: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Kg"
                value={formData.kg}
                onChange={(e) => setFormData({ ...formData, kg: e.target.value })}
                className="border p-2 rounded"
              />

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="% descuento (0 = sin oferta)"
                    value={formData.descuento || ""}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : 0;
                      setFormData({ 
                        ...formData, 
                        descuento: value,
                        oferta: value > 0
                      });
                    }}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Crear Producto
            </button>
          </form>
        )}

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Oferta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No hay productos registrados
                    </td>
                  </tr>
                ) : (
                  productos.map((prod) => (
                    <tr key={prod.id} className="hover:bg-gray-50">
                      {editandoId === prod.id ? (
                        <>
                          <td className="px-6 py-4" colSpan="6">
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  value={editandoProducto.nombre}
                                  onChange={(e) => setEditandoProducto({ ...editandoProducto, nombre: e.target.value })}
                                  className="border p-2 rounded"
                                  placeholder="Nombre"
                                />
                                <select
                                  value={editandoProducto.id_categoria}
                                  onChange={(e) => setEditandoProducto({ ...editandoProducto, id_categoria: e.target.value })}
                                  className="border p-2 rounded"
                                >
                                  {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                  ))}
                                </select>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={editandoProducto.precio}
                                  onChange={(e) => setEditandoProducto({ ...editandoProducto, precio: e.target.value })}
                                  className="border p-2 rounded"
                                  placeholder="Precio"
                                />
                                <div>
                                  <input
                                    type="text"
                                    value={editandoProducto.imagen}
                                    onChange={(e) => setEditandoProducto({ ...editandoProducto, imagen: e.target.value })}
                                    className="border p-2 rounded w-full mb-2"
                                    placeholder="URL Imagen"
                                  />

                                  <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      const files = Array.from(e.dataTransfer.files || []);
                                      if (files.length > 0) {
                                        setEditandoProducto({
                                          ...editandoProducto, 
                                          imagenFiles: [...(editandoProducto.imagenFiles || []), ...files],
                                        // Actualizar también el campo de texto
                                        imagen: files.map(f => f.name).join(', ')
                                        });
                                      }
                                    }}
                                    className="border-dashed border-2 border-gray-300 rounded p-2 text-center"
                                  > Arrastra y suelta imágenes aquí o haz clic para seleccionar
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (files.length > 0) {
                                          setEditandoProducto({
                                            ...editandoProducto, 
                                            imagenFiles: [...(editandoProducto.imagenFiles || []), ...files],
                                           // Mostrar los nombres de los archivos en el campo de texto
                                            imagen: files.map(f => f.name).join(', ')
                                          });
                                        }
                                      }}
                                      className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1"></p>

                                    {/* Vista principal de la imagen seleccionada */}
                                    {(editandoProducto.imagenes?.length > 0 || editandoProducto.imagenFiles?.length > 0) && (
                                      <div className="mt-4 space-y-4">
                                        <div className="relative w-full max-w-xl mx-auto">
                                          {editandoProducto.imagenes && editandoProducto.imagenes.length > selectedImage && (
                                            <img
                                              src={editandoProducto.imagenes[selectedImage]}
                                              alt="Vista principal"
                                              className="w-full h-64 object-contain rounded-lg shadow-md"
                                            />
                                          )}
                                          {editandoProducto.imagenFiles && selectedImage >= (editandoProducto.imagenes?.length || 0) && (
                                            <img
                                              src={URL.createObjectURL(editandoProducto.imagenFiles[selectedImage - (editandoProducto.imagenes?.length || 0)])}
                                              alt="Vista principal nueva"
                                              className="w-full h-64 object-contain rounded-lg shadow-md"
                                            />
                                          )}
                                        </div>

                                        {/* Miniaturas con botones de eliminar */}
                                        <div className="flex gap-2 flex-wrap justify-center">
                                          {editandoProducto.imagenes && editandoProducto.imagenes.map((src, i) => (
                                            <div key={`ex-${i}`} className="relative group">
                                              <img
                                                src={src}
                                                alt={`img-${i}`}
                                                onClick={() => setSelectedImage(i)}
                                                className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                                                  selectedImage === i ? 'ring-2 ring-pink-500' : 'hover:ring-2 hover:ring-gray-300'
                                                }`}
                                              />
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const newImagenes = editandoProducto.imagenes.filter((_, index) => index !== i);
                                                  setEditandoProducto({ ...editandoProducto, imagenes: newImagenes });
                                                  if (selectedImage >= newImagenes.length) {
                                                    setSelectedImage(Math.max(0, newImagenes.length - 1));
                                                  }
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Eliminar imagen"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          ))}
                                          {editandoProducto.imagenFiles && editandoProducto.imagenFiles.map((file, idx) => (
                                            <div key={`new-${idx}`} className="relative group">
                                              <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${idx}`}
                                                onClick={() => setSelectedImage((editandoProducto.imagenes?.length || 0) + idx)}
                                                className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                                                  selectedImage === ((editandoProducto.imagenes?.length || 0) + idx) ? 'ring-2 ring-pink-500' : 'hover:ring-2 hover:ring-gray-300'
                                                }`}
                                              />
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const newFiles = editandoProducto.imagenFiles.filter((_, index) => index !== idx);
                                                  setEditandoProducto({ ...editandoProducto, imagenFiles: newFiles });
                                                  if (selectedImage >= (editandoProducto.imagenes?.length || 0) + newFiles.length) {
                                                    setSelectedImage(Math.max(0, (editandoProducto.imagenes?.length || 0) + newFiles.length - 1));
                                                  }
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Eliminar imagen"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <textarea
                                value={editandoProducto.descripcion}
                                onChange={(e) => setEditandoProducto({ ...editandoProducto, descripcion: e.target.value })}
                                className="border p-2 rounded w-full"
                                rows="2"
                                placeholder="Descripción"
                              />
                              
                              {/* Campos adicionales */}
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                <input
                                  type="text"
                                  value={editandoProducto.personalizacion || ""}
                                  onChange={(e) => setEditandoProducto({ ...editandoProducto, personalizacion: e.target.value })}
                                  className="border p-2 rounded"
                                  placeholder="Personalización"
                                />
                                
                                <input
                                  type="number"
                                  step="0.01"
                                  value={editandoProducto.kg || ""}
                                  onChange={(e) => setEditandoProducto({ ...editandoProducto, kg: e.target.value ? parseFloat(e.target.value) : null })}
                                  className="border p-2 rounded"
                                  placeholder="Kg"
                                />

                                <div className="flex items-center gap-4 col-span-2">
                                  <div className="flex-1">
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="0.01"
                                      placeholder="% descuento (0 = sin oferta)"
                                      value={editandoProducto.descuento || ""}
                                      onChange={(e) => {
                                        const value = e.target.value ? parseFloat(e.target.value) : 0;
                                        setEditandoProducto({ 
                                          ...editandoProducto, 
                                          descuento: value,
                                          oferta: value > 0
                                        });
                                      }}
                                      className="border p-2 rounded w-full"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => handleGuardarEdicion(prod.id)}
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
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <div className="relative group">
                              <img 
                                src={(prod.imagenes && prod.imagenes.length > 0) ? `http://localhost:3000/uploads/${prod.imagenes[0]}` : (prod.imagen ? `http://localhost:3000/uploads/${prod.imagen}` : 'https://via.placeholder.com/64')} 
                                alt={prod.nombre} 
                                className="w-16 h-16 object-cover rounded" 
                              />
                              {prod.imagenes && prod.imagenes.length > 1 && (
                                <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                  +{prod.imagenes.length - 1}
                                </div>
                              )}
                              {prod.imagenes && prod.imagenes.length > 1 && (
                                <div className="hidden group-hover:flex absolute left-full ml-2 bg-white p-2 rounded-lg shadow-lg gap-2 z-10">
                                  {prod.imagenes.map((img, idx) => (
                                    <img 
                                      key={idx} 
                                      src={`http://localhost:3000/uploads/${img}`} 
                                      alt={`${prod.nombre} ${idx + 1}`} 
                                      className="w-16 h-16 object-cover rounded" 
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{prod.nombre}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{getCategoriaName(prod.id_categoria)}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">${prod.precio}</td>
                          <td className="px-6 py-4">
                            {prod.oferta ? (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                {prod.descuento}% OFF
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditar(prod)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleEliminar(prod.id)}
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
      </div>
    </>
  );
};

export default CrudProductos;