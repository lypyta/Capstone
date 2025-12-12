import { useState, useEffect } from "react";

export default function ModalEditarProducto({
  visible,
  producto,
  onClose,
  onProductUpdated,
}) {
  if (!visible || !producto) return null;

  const [form, setForm] = useState(producto);

  // Cuando cambia el producto seleccionado
  useEffect(() => {
    setForm(producto);
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${form.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: form.nombre,
            codigo_sku: form.codigo_sku,
            precio_venta: Number(form.precio_venta),
            unidad_medida: form.unidad_medida,
          }),
        }
      );

      if (!response.ok) {
        alert("Error al actualizar el producto");
        return;
      }

      // Actualizar frontend
      onProductUpdated({
        ...form,
        precio_venta: Number(form.precio_venta),
      });

      onClose();
    } catch (error) {
      console.error("Error actualizando producto:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="codigo_sku"
            placeholder="SKU"
            className="w-full border p-2 rounded"
            value={form.codigo_sku ?? ""}
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.01"
            name="precio_venta"
            placeholder="Precio"
            className="w-full border p-2 rounded"
            value={form.precio_venta}
            onChange={handleChange}
          />

          <input
            type="text"
            name="unidad_medida"
            placeholder="Unidad (unidad, hora, servicio)"
            className="w-full border p-2 rounded"
            value={form.unidad_medida ?? ""}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
