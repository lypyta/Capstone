import { useState, useEffect } from "react";

export default function ModalEditarProveedor({ visible, onClose, proveedor, onUpdated }) {

    if (!visible || !proveedor) return null;

    const [form, setForm] = useState(proveedor);

    useEffect(() => {
        setForm(proveedor);
    }, [proveedor]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación RUT
    const rutRegex = /^[0-9]+-[0-9kK]$/;
    if (!rutRegex.test(form.rut)) {
        alert("El RUT es inválido. Ejemplo correcto: 12345678-9");
        return;
    }

    // Validación email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
        alert("Email inválido");
        return;
    }

    // Validación teléfono
    const phoneRegex = /^[0-9+\-\s]{6,15}$/;
    if (form.telefono && !phoneRegex.test(form.telefono)) {
        alert("Teléfono inválido. Ej: +56912345678");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/suppliers/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
            alert("Error: " + data.detail);
            return;
        }

        onUpdated(data);
        onClose();

    } catch (error) {
        console.error("Error actualizando proveedor:", error);
        alert("Error al conectar con el servidor");
    }
};

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

        <div className="bg-white p-6 rounded-lg shadow-lg w-96">

            <h2 className="text-xl font-bold mb-4">Editar Proveedor</h2>

            <form className="space-y-3" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="nombre"
                    className="w-full border p-2 rounded"
                    value={form.nombre}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="rut"
                    className="w-full border p-2 rounded"
                    value={form.rut}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    className="w-full border p-2 rounded"
                    value={form.email ?? ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="telefono"
                    className="w-full border p-2 rounded"
                    value={form.telefono ?? ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="insumo_provee"
                    className="w-full border p-2 rounded"
                    value={form.insumo_provee ?? ""}
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
                        Guardar cambios
                    </button>
                </div>

            </form>

        </div>
    </div>
);
}
