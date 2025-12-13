import { useState, useEffect } from "react";

export default function ModalEditarCliente({
  visible,
  onClose,
  cliente,
  onClientUpdated,
}) {
  if (!visible || !cliente) return null;

  const [form, setForm] = useState(cliente);

  useEffect(() => {
    setForm(cliente);
  }, [cliente]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validaciones básicas
  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarTelefono = (t) =>
    /^[0-9+\-\s]{6,15}$/.test(t);

  const validarRut = (rut) =>
    /^[0-9]+-[0-9kK]$/.test(rut);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRut(form.rut)) {
      alert("Formato de RUT inválido (Ej: 12345678-9)");
      return;
    }

    if (form.email && !validarEmail(form.email)) {
      alert("Formato de email inválido");
      return;
    }

    if (form.telefono && !validarTelefono(form.telefono)) {
      alert("Formato de teléfono inválido (Ej: +56912345678)");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/clients/${form.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + data.detail);
        return;
      }

      onClientUpdated(data);
      onClose();
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del cliente"
            className="w-full border p-2 rounded"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="rut"
            placeholder="Ej: 12345678-9"
            className="w-full border p-2 rounded"
            value={form.rut}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Ej: correo@empresa.cl"
            className="w-full border p-2 rounded"
            value={form.email ?? ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Ej: +56912345678"
            className="w-full border p-2 rounded"
            value={form.telefono ?? ""}
            onChange={handleChange}
          />

          {/* ✅ NUEVO CAMPO DIRECCIÓN */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            className="w-full border p-2 rounded"
            value={form.direccion ?? ""}
            onChange={handleChange}
          />

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
