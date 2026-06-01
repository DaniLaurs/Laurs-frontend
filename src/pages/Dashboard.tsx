import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f7ff] flex">

      {/* Sidebar */}

        <Sidebar />

        <main className="flex-1 p-8"></main>

      {/* Conteúdo */}
      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Bem-vindo, {user?.name} 👋
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold">
              R$ 12.540
            </h2>

            <p className="text-gray-500">
              Vendas
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold">
              324
            </h2>

            <p className="text-gray-500">
              Pedidos
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold">
              1.245
            </h2>

            <p className="text-gray-500">
              Clientes
            </p>
          </div>

        </div>

        {/* Área do gráfico futuramente */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Vendas Mensais
          </h2>

          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Gráfico em desenvolvimento 🚀
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;