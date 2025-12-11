export default function ModalEliminarCliente({ visible, onClose, cliente, onClientDeleted }) {
    if (!visible || !cliente) return null;

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/clients/${cliente.id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                alert("Error eliminando cliente: " + data.detail);
                return;
            }

            // Avisar al componente padre que elimine de la lista
            onClientDeleted(cliente.id);

            // Cerrar modal
            onClose();

        } catch (error) {
            console.error("Error eliminando cliente:", error);
            alert("No se pudo eliminar el cliente");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow w-96">
                <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar Cliente</h2>

                <p className="mb-4">
                    ¿Seguro que quieres eliminar al cliente:
                    <br />
                    <strong>{cliente.nombre}</strong> (ID {cliente.id})?
                </p>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Sí, eliminar
                    </button>

                </div>
            </div>
        </div>
    );
}
