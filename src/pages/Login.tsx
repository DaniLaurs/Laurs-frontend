/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await fetch(
        "http://localhost:3333/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
        if (response.ok) {

          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          alert("Login realizado com sucesso 😄🔥");

          navigate("/dashboard");
        } else {
        alert(data.error || "Erro no login");
      }

    } catch (error) {
      console.log(error);

      alert("Erro ao fazer login");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 relative z-10">

        <h1 className="text-4xl font-bold text-center mb-3">
          Entrar
        </h1>

        <p className="text-gray-500 text-center mb-10">
          Acesse sua conta no Laurs
        </p>

        <form className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/50 border border-white/30 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/50 border border-white/30 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            type="button"
            onClick={handleLogin}
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition duration-300"
          >
            Entrar
          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">
          Não possui conta?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Criar conta
          </Link>

        </p>

      </div>
    </section>
  );
}

export default Login;