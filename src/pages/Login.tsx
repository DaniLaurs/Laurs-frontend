import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/logo-laurs.png";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
     if (!email || !password) {
      alert("Preencha o e-mail e a senha.");
      return;
    }


    try {
          setLoading(true);

        const response = await api.post("/auth/login", {
          email,
          password,
        });

        const data = response.data;

        if (response.status === 200) {
            login(data.user, data.token);


          alert("Login realizado com sucesso 😄🔥");

          navigate("/dashboard");
        } else {
        alert(data.error || "Erro no login");
      }

    } catch  {


      alert("Erro ao fazer login");
    }
     finally {
    setLoading(false);
     }
  } 
  

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-400 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[300px] h-[300px] bg-purple-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 relative z-10">

      <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Laurs"
            className="h-16 w-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-3">
          Entrar
        </h1>

        <p className="text-gray-500 text-center mb-10">
          Acesse sua conta na Laurs
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-5"
        >

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
            type="submit"
            disabled= {loading}
            className="bg-gradient-to-r  to-purple-200 bg-purple-600 text-white py-4 rounded-2xl font-semibold hover:scale-102 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition duration-300"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">
          Não possui conta?{" "}

          <Link
            to="/register"
            className="text-purple-600 font-semibold"
          >
            Criar conta
          </Link>

        </p>

      </div>
    </section>
  );
}

export default Login;