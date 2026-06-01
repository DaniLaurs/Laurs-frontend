import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">

      <h1 className="text-3xl font-bold mb-10">
        Laurs
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="text-left p-3 rounded-xl hover:bg-gray-100 transition"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/dashboard/products"
          className="text-left p-3 rounded-xl hover:bg-gray-100 transition"
        >
          📦 Produtos
        </Link>

        <button className="text-left p-3 rounded-xl hover:bg-gray-100 transition">
          🛒 Pedidos
        </button>

        <button className="text-left p-3 rounded-xl hover:bg-gray-100 transition">
          👥 Clientes
        </button>

        <button className="text-left p-3 rounded-xl hover:bg-gray-100 transition">
          ⚙️ Configurações
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;