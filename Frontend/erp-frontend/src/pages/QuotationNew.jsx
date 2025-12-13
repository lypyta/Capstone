import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function QuotationNew() {
  /* ================= ESTADOS ================= */
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const [items, setItems] = useState([
    {
      producto_id: "",
      nombre: "",
      cantidad: 1,
      precio: 0,
    },
  ]);

  /* ================= CARGA CLIENTES ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/clients/")
      .then((res) => res.json())
      .then(setClientes)
      .catch((err) => console.error("Error cargando clientes:", err));
  }, []);

  /* ================= CARGA PRODUCTOS ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then(setProductos)
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  /* ================= MANEJO PRODUCTOS ================= */
  const handleProductoChange = (index, productId) => {
    const producto = productos.find((p) => p.id === Number(productId));
    const nuevosItems = [...items];

    nuevosItems[index] = {
      ...nuevosItems[index],
      producto_id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio_venta,
    };

    setItems(nuevosItems);
  };

  const handleItemChange = (index, field, value) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = value;
    setItems(nuevosItems);
  };

  const agregarProducto = () => {
    setItems([
      ...items,
      { producto_id: "", nombre: "", cantidad: 1, precio: 0 },
    ]);
  };

  const eliminarProducto = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  /* ================= TOTALES ================= */
  const neto = items.reduce(
    (sum, i) => sum + i.cantidad * i.precio,
    0
  );
  const iva = neto * 0.19;
  const total = neto + iva;

  return (
    <Layout title="Nueva Cotización">
      {/* ================= CLIENTE ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Cliente</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Cliente</label>
            <select
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const cliente = clientes.find(
                  (c) => c.id === Number(e.target.value)
                );
                setClienteSeleccionado(cliente);
              }}
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">RUT</label>
            <input
              disabled
              value={clienteSeleccionado?.rut ?? ""}
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Dirección</label>
            <input
              disabled
              value={clienteSeleccionado?.direccion ?? ""}
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              disabled
              value={clienteSeleccionado?.email ?? ""}
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* ================= PRODUCTOS ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Productos</h2>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Subtotal</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">
                  <select
                    className="w-full border p-1 rounded"
                    value={item.producto_id}
                    onChange={(e) =>
                      handleProductoChange(index, e.target.value)
                    }
                  >
                    <option value="">Seleccionar producto</option>
                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-2 border">
                  <input
                    type="number"
                    min="1"
                    className="w-full border p-1 rounded"
                    value={item.cantidad}
                    onChange={(e) =>
                      handleItemChange(index, "cantidad", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-2 border">
                  <input
                    type="number"
                    className="w-full border p-1 rounded"
                    value={item.precio}
                    onChange={(e) =>
                      handleItemChange(index, "precio", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-2 border text-right">
                  ${item.cantidad * item.precio}
                </td>

                <td className="p-2 border text-center">
                  {items.length > 1 && (
                    <button
                      className="text-red-600"
                      onClick={() => eliminarProducto(index)}
                    >
                      🗑
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="mt-4 text-blue-600 hover:underline"
          onClick={agregarProducto}
        >
          + Agregar producto
        </button>
      </div>

      {/* ================= TOTALES ================= */}
      <div className="bg-white p-6 rounded shadow mb-6 w-full md:w-1/2 ml-auto">
        <div className="flex justify-between mb-2">
          <span>Neto</span>
          <span>${neto}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>IVA (19%)</span>
          <span>${iva}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* ================= OBSERVACIONES ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-2">Observaciones</h2>
        <textarea
          rows="4"
          className="w-full border p-2 rounded"
          placeholder="Observaciones adicionales para la cotización"
        />
      </div>

      {/* ================= ACCIONES ================= */}
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancelar
        </button>

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Guardar Cotización
        </button>
      </div>
    </Layout>
  );
}
