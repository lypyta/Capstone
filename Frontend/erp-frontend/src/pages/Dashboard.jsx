import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">FINANDISRUPTOR</h2>

        <nav className="space-y-3">
  <Link to="/" className="block p-2 rounded hover:bg-gray-700">
    Dashboard
  </Link>

  <Link to="/clients" className="block p-2 rounded hover:bg-gray-700">
    Clientes
  </Link>

  <Link to="/suppliers" className="block p-2 rounded hover:bg-gray-700">
    Proveedores
  </Link>

  <Link to="/products" className="block p-2 rounded hover:bg-gray-700">
    Productos
  </Link>

  <Link to="/quotations" className="block p-2 rounded hover:bg-gray-700">
    Cotizaciones
  </Link>

  <Link to="/invoices" className="block p-2 rounded hover:bg-gray-700">
    Facturas
  </Link>
</nav>

      </aside>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-10">

        {/* Título */}
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Clientes</h2>
            <p className="text-gray-600">Cantidad total de clientes</p>
            <p className="text-4xl mt-4 font-bold text-blue-600">25</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Proveedores</h2>
            <p className="text-gray-600">Cantidad total de proveedores</p>
            <p className="text-4xl mt-4 font-bold text-green-600">10</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Productos</h2>
            <p className="text-gray-600">Cantidad total de productos</p>
            <p className="text-4xl mt-4 font-bold text-purple-600">150</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
