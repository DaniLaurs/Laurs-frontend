import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, logout } = useAuth();
  console.log("USER:", user);
  
  return (
    <nav className="w-full flex items-center justify-between px-12 py-6 backdrop-blur-xl bg-white/60 border-b border-white/20 sticky top-0 z-50">

      <h1 className="text-3xl font-bold">
        Laurs
      </h1>

      <div className="flex items-center gap-8">

        <a href="#" className="text-gray-700 hover:text-black">
          Recursos
        </a>

        <a href="#" className="text-gray-700 hover:text-black">
          Preços
        </a>

        
      {user ? (

  <div className="flex items-center gap-4">

    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
        {user.name.charAt(0)}
      </div>

      <span className="font-semibold text-gray-700">
        {user.name}
      </span>

    </div>

    <button
      onClick={logout}
      className="text-red-500 hover:text-red-700 font-medium transition"
    >
      Sair
    </button>

  </div>

) : (

  <>
    <Link
      to="/login"
      className="text-gray-700 hover:text-black"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition duration-300"
    >
      Criar loja
    </Link>

    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
      D
    </div>
  </>

)}
      </div>
    </nav>
  );
}

export default Navbar;