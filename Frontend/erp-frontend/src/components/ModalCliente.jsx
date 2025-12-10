export default function ModalCliente({ visible, onClose }) {
  // Si no está visible, no mostramos nada
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>

        {/* Formulario */}
        <form className="space-y-3">
          <input type="text" placeholder="Nombre" className="w-full border p-2 rounded" />
          <input type="text" placeholder="RUT" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Teléfono" className="w-full border p-2 rounded" />

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
