import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import ModalCliente from "../components/ModalCliente";
import ModalEditarCliente from "../components/ModalEditarCliente";
import ModalEliminarCliente from "../components/ModalEliminarCliente";


export default function Clients() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  // Cargar clientes desde FastAPI
  useEffect(() => {
    fetch("http://127.0.0.1:8000/clients/")
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando clientes:", err);
        setLoading(false);
      });
  }, []);

  // Agregar cliente recién creado
  const addClient = (nuevoCliente) => {
    setClientes((prev) => [...prev, nuevoCliente]);
  };

  // Actualizar cliente editado
  const handleClientUpdated = (updatedClient) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };
  const handleClientDeleted = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Layout title="Gestión de Clientes">
      <div>
        <h2 className="text-xl font-bold mb-4">Listado de Clientes</h2>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowModal(true)}
        >
          + Nuevo Cliente
        </button>

        {loading ? (
          <p>Cargando clientes...</p>
        ) : (
          <table className="w-full border-collapse text-sm bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">RUT</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Teléfono</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td className="p-2 border">{c.id}</td>
                  <td className="p-2 border">{c.nombre}</td>
                  <td className="p-2 border">{c.rut}</td>
                  <td className="p-2 border">{c.email ?? "—"}</td>
                  <td className="p-2 border">{c.telefono ?? "—"}</td>
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => {
                        setClienteSeleccionado(c);
                        setShowEditModal(true);
                      }}
                    >
                      ✏ Editar
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        setClienteSeleccionado(c);
                        setShowDeleteModal(true);
                      }}
                    >
                      🗑 Eliminar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Crear */}
      <ModalCliente
        visible={showModal}
        onClose={() => setShowModal(false)}
        onClientCreated={addClient}
      />

      {/* Modal Editar */}
      <ModalEditarCliente
        visible={showEditModal}
        cliente={clienteSeleccionado}
        onClose={() => setShowEditModal(false)}
        onClientUpdated={handleClientUpdated}
      />
      <ModalEliminarCliente
  visible={showDeleteModal}
  cliente={clienteSeleccionado}
  onClose={() => setShowDeleteModal(false)}
  onClientDeleted={handleClientDeleted}
/>


    </Layout>
  );
}
