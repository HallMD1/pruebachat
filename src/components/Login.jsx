import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Credenciales inválidas");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Clínica Hall</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input ref={emailRef} type="email" placeholder="Correo" className="border p-2 w-full mb-3 rounded" />
        <input ref={passwordRef} type="password" placeholder="Contraseña" className="border p-2 w-full mb-4 rounded" />
        <button className="w-full p-2 rounded bg-blue-600 text-white">Ingresar</button>
      </form>
    </div>
  );
}
