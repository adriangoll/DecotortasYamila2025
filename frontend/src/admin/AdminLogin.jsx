import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavAdmin from "./NavAdmin";

export default function LoginAdmin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Usuario y pass fijos
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin"); // redirige al dashboard
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div>
        <div><NavAdmin/></div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Login Admin</h2>
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors"
      >
        Ingresar
      </button>
    </form>
    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  </div>
</div>
  );
}