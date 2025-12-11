import { useState } from "react";

export default function ModalProveedor({ visible, onClose, onCreated }) {

  if (!visible) return null;

  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    insumo_provee: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // ---------------- VALIDACIONES ----------------

  // Validación de RUT (simple)
  const rutRegex = /^[0-9]+-[0-9kK]$/;
  if (!rutRegex.test(form.rut)) {
    alert("El RUT es inválido. Ejemplo correcto: 12345678-9");
    return;
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form.email && !emailRegex.test(form.email)) {
    alert("El formato del email es incorrecto.");
    return;
  }

  // Validación de teléfono
  const phoneRegex = /^[0-9+\-\s]{6,15}$/;
  if (form.telefono && !phoneRegex.test(form.telefono)) {
    alert("El formato del teléfono es incorrecto. Ejemplo: +56912345678");
    return;
  }

  // ------------------------------------------------

  try {
    const response = await fetch("http://127.0.0.1:8000/suppliers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      alert("Error: " + data.detail);
      return;
    }

    onCreated(data);
    onClose();

  } catch (error) {
    console.error("Error creando proveedor:", error);
    alert("No se pudo conectar al servidor");
  }
};

return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">

      <h2 className="text-xl font-bold mb-4">Nuevo Proveedor</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="rut"
          placeholder="RUT"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="insumo_provee"
          placeholder="¿Qué insumo provee?"
          className="w-full border p-2 rounded"
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
