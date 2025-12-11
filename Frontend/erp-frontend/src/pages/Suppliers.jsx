import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import ModalProveedor from "../components/ModalProveedor";
import ModalEditarProveedor from "../components/ModalEditarProveedor";


export default function Suppliers() {

  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const eliminarProveedor = async (id) => {
    if (!confirm("¿Seguro deseas eliminar este proveedor?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/suppliers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert("Error: " + data.detail);
        return;
      }

      // Quitar proveedor del estado
      setProveedores(prev => prev.filter((p) => p.id !== id));

    } catch (error) {
      console.error("Error eliminando proveedor:", error);
      alert("No se pudo conectar al servidor");
    }
  };

  const updateSupplier = (updated) => {
    setProveedores(prev =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const addSupplier = (nuevo) => {
    setProveedores((prev) => [...prev, nuevo]);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/suppliers/")
      .then((res) => res.json())
      .then((data) => {
        setProveedores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando proveedores:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Gestión de Proveedores">

      <h2 className="text-xl font-bold mb-4">Listado de Proveedores</h2>

      {/* BOTÓN NUEVO PROVEEDOR */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        + Nuevo Proveedor
      </button>

      {loading ? (
        <p>Cargando proveedores...</p>
      ) : (
        <table className="w-full border-collapse text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">RUT</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Insumo que provee</th>   
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.nombre}</td>
                <td className="p-2 border">{p.rut}</td>
                <td className="p-2 border">{p.email ?? "—"}</td>
                <td className="p-2 border">{p.telefono ?? "—"}</td>
                <td className="p-2 border">{p.insumo_provee ?? "—"}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => {
                      setProveedorSeleccionado(p);
                      setShowEditModal(true);
                    }}
                  >
                    ✏ Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => eliminarProveedor(p.id)}
                  >
                    🗑 Eliminar
                  </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL PROVEEDOR */}
      <ModalProveedor
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreated={addSupplier}
      />
      <ModalEditarProveedor
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        proveedor={proveedorSeleccionado}
        onUpdated={updateSupplier}
      />


    </Layout>
  );
}
