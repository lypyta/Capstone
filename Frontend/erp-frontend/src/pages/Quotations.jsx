import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Quotations() {
  return (
    <Layout title="Cotizaciones">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Listado de Cotizaciones</h2>

        <Link
          to="/quotations/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Nueva Cotización
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">N°</th>
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No hay cotizaciones registradas
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
