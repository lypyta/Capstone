import Layout from "../components/Layout";

export default function Invoices() {
  return (
    <Layout title="Facturas">
      <p className="text-gray-700 text-lg">Aquí podrás gestionar facturas del sistema.</p>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold">Lista de Facturas</h2>
        <p className="text-gray-600">Pronto agregaremos tabla y CRUD.</p>
      </div>
    </Layout>
  );
}
