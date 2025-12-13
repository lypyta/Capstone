import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import Quotations from "./pages/Quotations";
import QuotationNew from "./pages/QuotationNew";
import Invoices from "./pages/Invoices";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quotations"
          element={
            <ProtectedRoute>
              <Quotations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quotations/new"
          element={
            <ProtectedRoute>
              <QuotationNew />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
