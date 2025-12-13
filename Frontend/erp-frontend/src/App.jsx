import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import Quotations from "./pages/Quotations";
import Invoices from "./pages/Invoices";
import QuotationNew from "./pages/QuotationNew";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/quotations" element={<Quotations />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/quotations/new" element={<QuotationNew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
