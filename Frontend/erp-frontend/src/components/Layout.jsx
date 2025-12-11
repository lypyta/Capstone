import { Link, useLocation } from "react-router-dom";

export default function Layout({ title, children }) {

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-gray-700" : "";

  return (
    <div className="flex h-screen">

      <aside className="w-64 bg-gray-900 text-white p-5">

        {/* AGREGADO: LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="
      w-80 h-auto      /* <-- AUMENTA EL TAMAÑO AQUÍ */
      drop-shadow-lg
      animate-pulse-glow

      transition-all duration-300
      hover:scale-105
      hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.9)]
      hover:border-teal-300
    "
          />
        </div>

        <nav className="space-y-3">
          <Link
            to="/"
            className={`block p-2 rounded hover:bg-gray-700 ${isActive("/")}`}
          >
            Dashboard
          </Link>

          <Link
            to="/clients"
            className={`block p-2 rounded hover:bg-gray-700 ${isActive("/clients")}`}
          >
            Clientes
          </Link>

          <Link
            to="/suppliers"
            className={`block p-2 rounded hover:bg-gray-700 ${isActive("/suppliers")}`}
          >
            Proveedores
          </Link>

          <Link
            to="/products"
            className={`block p-2 rounded hover:bg-gray-700 ${isActive("/products")}`}
          >
            Productos
          </Link>

          <Link
            to="/quotations"
            className={`block p-2 rounded hover:bg-gray-700 ${isActive("/quotations")}`}
          >
            Cotizaciones
          </Link>

          <Link
            to="/invoices"
            className={`block p-2 rounded hover:bg-gray-700 ${isActive("/invoices")}`}
          >
            Facturas
          </Link>
        </nav>
      </aside>

      <div className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </div>

    </div>
  );
}
