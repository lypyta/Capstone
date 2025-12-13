import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import ModalProducto from "../components/ModalProducto";
import ModalEditarProducto from "../components/ModalEditarProducto";

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 👉 Agregar producto recién creado
  const addProduct = (nuevo) => {
    setProductos((prev) => [...prev, nuevo]);
  };

  // 👉 Cargar productos
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

  // 👉 Eliminar producto
  const deleteProduct = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        alert("No se pudo eliminar el producto");
        return;
      }

      // Quitar del estado (frontend)
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Error de conexión con el servidor");
    }
  };
  const handleProductUpdated = (updatedProduct) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

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

                <td className="p-2 border flex gap-2">
                  {/* EDITAR */}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setProductoSeleccionado(p);
                      setShowEditModal(true);
                    }}
                  >
                    ✏ Editar
                  </button>

                  {/* ELIMINAR */}
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteProduct(p.id)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL CREAR */}
      <ModalProducto
        visible={showModal}
        onClose={() => setShowModal(false)}
        onProductCreated={addProduct}
      />

      <ModalEditarProducto
        visible={showEditModal}
        producto={productoSeleccionado}
        onClose={() => setShowEditModal(false)}
        onProductUpdated={handleProductUpdated}
      />

    </Layout>
  );
}
