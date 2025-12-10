import Layout from "../components/Layout";

export default function Quotations() {
  return (
    <Layout title="Cotizaciones">
      <p className="text-gray-700 text-lg">Aquí podrás revisar y crear cotizaciones.</p>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold">Historial de Cotizaciones</h2>
        <p className="text-gray-600">Tabla próximamente.</p>
      </div>
    </Layout>
  );
}
