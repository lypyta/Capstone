import { useState } from "react";

export default function ModalCliente({ visible, onClose, onClientCreated }) {
  if (!visible) return null;

  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/clients/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + data.detail);
        return;
      }

      onClientCreated(data);
      onClose();
    } catch (error) {
      console.error("Error creando cliente:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="rut"
            placeholder="RUT"
            className="w-full border p-2 rounded"
            value={form.rut}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            className="w-full border p-2 rounded"
            value={form.telefono}
            onChange={handleChange}
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            className="w-full border p-2 rounded"
            value={form.direccion}
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
