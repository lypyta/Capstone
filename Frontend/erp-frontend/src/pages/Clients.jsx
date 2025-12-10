import Layout from "../components/Layout";
import { useState } from "react";
import ModalCliente from "../components/ModalCliente";

export default function Clients() {

  // ESTADO DEL MODAL
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout title="Clientes">
      <p className="text-gray-600 mb-6">
        Aquí podrás gestionar todos los clientes del sistema.
      </p>

      {/* Contenedor blanco */}
      <div className="bg-white p-6 rounded-lg shadow">

        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lista de Clientes</h2>

          {/* BOTÓN QUE ABRE EL MODAL */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            + Agregar Cliente
          </button>
        </div>

        {/* Tabla */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">RUT</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-2 border">1</td>
              <td className="p-2 border">Cliente ABC</td>
              <td className="p-2 border">11.111.111-1</td>
              <td className="p-2 border">juan@clienteabc.cl</td>
              <td className="p-2 border">+56911111111</td>
              <td className="p-2 border">
                <button className="text-blue-600 hover:underline mr-2">Editar</button>
                <button className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      {/* MODAL DEL CLIENTE */}
      <ModalCliente visible={showModal} onClose={() => setShowModal(false)} />

    </Layout>
  );
}
