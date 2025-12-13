import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // LOGIN SIMULADO
    if (email === "admin@erp.cl" && password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          ERP Cloud – Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Ingresar
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Demo: admin@erp.cl / 1234
        </p>
      </form>
    </div>
  );
}
