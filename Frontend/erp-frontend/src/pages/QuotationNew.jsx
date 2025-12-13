import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuotationNew() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/clients/")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error cargando clientes:", err));
  }, []);

  // 👉 GUARDAR (por ahora solo validación + log)
  const handleGuardarCotizacion = () => {
    if (!clienteSeleccionado) {
      alert("Debes seleccionar un cliente");
      return;
    }

    console.log("Cotización lista para guardar:", {
      clienteSeleccionado,
      observaciones,
    });

    alert("Cotización lista (backend lo conectamos ahora)");
  };

  // 👉 CANCELAR / CERRAR
  const handleCancelar = () => {
    if (window.confirm("¿Cancelar creación de cotización?")) {
      navigate("/quotations");
    }
  };

  return (
    <Layout title="Nueva Cotización">
      {/* ================= CLIENTE ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Cliente</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Cliente</label>
            <select
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const cliente = clientes.find(
                  (c) => c.id === Number(e.target.value)
                );
                setClienteSeleccionado(cliente || null);
              }}
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">RUT</label>
            <input
              type="text"
              value={clienteSeleccionado?.rut ?? ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Dirección</label>
            <input
              type="text"
              value={clienteSeleccionado?.direccion ?? ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="text"
              value={clienteSeleccionado?.email ?? ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* ================= OBSERVACIONES ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-2">Observaciones</h2>
        <textarea
          rows="4"
          className="w-full border p-2 rounded"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Observaciones adicionales para la cotización"
        />
      </div>

      {/* ================= ACCIONES ================= */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handleCancelar}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleGuardarCotizacion}
        >
          Guardar Cotización
        </button>
      </div>
    </Layout>
  );
}
