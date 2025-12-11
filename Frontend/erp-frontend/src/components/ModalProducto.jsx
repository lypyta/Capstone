import { useState } from "react";

export default function ModalProducto({ visible, onClose, onProductCreated }) {
  if (!visible) return null;

  const [form, setForm] = useState({
    nombre: "",
    codigo_sku: "",
    descripcion: "",
    precio_venta: 0,
    unidad_medida: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error al crear producto");
        return;
      }

      onProductCreated(data);
      onClose();

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nuevo Producto</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>

          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="codigo_sku"
            type="text"
            placeholder="Código SKU"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="unidad_medida"
            type="text"
            placeholder="Unidad (Ej: unidad, caja, kg)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="precio_venta"
            type="number"
            step="0.01"
            placeholder="Precio de venta"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
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
