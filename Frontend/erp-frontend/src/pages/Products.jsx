import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import ModalProducto from "../components/ModalProducto";

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const addProduct = (nuevo) => {
    setProductos((prev) => [...prev, nuevo]);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Gestión de Productos">
      <h2 className="text-xl font-bold mb-4">Listado de Productos</h2>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        + Nuevo Producto
      </button>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <table className="w-full border-collapse text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">SKU</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Unidad</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.nombre}</td>
                <td className="p-2 border">{p.codigo_sku ?? "—"}</td>
                <td className="p-2 border">{p.precio_venta}</td>
                <td className="p-2 border">{p.unidad_medida ?? "—"}</td>
                <td className="p-2 border">
                  <button className="text-red-600 hover:underline">
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalProducto
        visible={showModal}
        onClose={() => setShowModal(false)}
        onProductCreated={addProduct}
      />
    </Layout>
  );
}
