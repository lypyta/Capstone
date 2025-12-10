import { Link } from "react-router-dom";

export default function Layout({ title, children }) {
  return (
    <div className="flex h-screen">

      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">ERP Cloud</h2>

        <nav className="space-y-3">
          <Link to="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
          <Link to="/clients" className="block p-2 rounded hover:bg-gray-700">Clientes</Link>
          <Link to="/suppliers" className="block p-2 rounded hover:bg-gray-700">Proveedores</Link>
          <Link to="/products" className="block p-2 rounded hover:bg-gray-700">Productos</Link>
          <Link to="/quotations" className="block p-2 rounded hover:bg-gray-700">Cotizaciones</Link>
          <Link to="/invoices" className="block p-2 rounded hover:bg-gray-700">Facturas</Link>
        </nav>
      </aside>

      <div className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </div>

    </div>
  );
}
