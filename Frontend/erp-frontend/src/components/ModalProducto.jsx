import { useState } from "react";

export default function ModalProducto({ visible, onClose, onProductCreated }) {
  if (!visible) return null;

  const [form, setForm] = useState({
    nombre: "",
    codigo_sku: "",
    descripcion: "",
    precio_venta: "",
    unidad_medida: "",
    es_servicio: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación mínima
    if (!form.nombre.trim()) {
      alert("El nombre del producto es obligatorio");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + data.detail);
        return;
      }

      onProductCreated(data); // 👉 Agregar a la tabla del frontend
      onClose();

    } catch (error) {
      console.error("Error creando producto:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4">Nuevo Producto</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            className="w-full border p-2 rounded"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="codigo_sku"
            placeholder="Código SKU"
            className="w-full border p-2 rounded"
            value={form.codigo_sku}
            onChange={handleChange}
          />

          <input
            type="number"
            name="precio_venta"
            placeholder="Precio de venta"
            className="w-full border p-2 rounded"
            value={form.precio_venta}
            onChange={handleChange}
          />

          <input
            type="text"
            name="unidad_medida"
            placeholder="Unidad de medida (Ej: unidad, caja, kg...)"
            className="w-full border p-2 rounded"
            value={form.unidad_medida}
            onChange={handleChange}
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            className="w-full border p-2 rounded"
            rows="3"
            value={form.descripcion}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="es_servicio"
              checked={form.es_servicio}
              onChange={handleChange}
            />
            Es un servicio (no producto físico)
          </label>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
