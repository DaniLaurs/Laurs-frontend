function DashboardPreview() {
  return (
    <section className="w-full flex justify-center px-6 pb-32">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">

        <div className="flex">

          <div className="w-64 border-r border-gray-200 pr-6">
            <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

            <div className="flex flex-col gap-4 text-gray-600">
              <p>📊 Dashboard</p>
              <p>📦 Produtos</p>
              <p>🛒 Pedidos</p>
              <p>👥 Clientes</p>
              <p>⚙️ Configurações</p>
            </div>
          </div>

          <div className="flex-1 pl-8">

            <div className="flex items-center justify-between mb-10">

              <div>
                <h3 className="text-3xl font-bold">
                  Bem-vinda de volta 👋
                </h3>

                <p className="text-gray-500 mt-2">
                  Veja os dados da sua loja.
                </p>
              </div>

              <div className="flex items-center gap-4">

                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl px-5 py-3 outline-none shadow-lg"
                />

                <button className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-5 py-3 rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition duration-300">
                  Novo produto
                </button>

              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">

              <div className="bg-gray-100 rounded-2xl p-6">
                <p className="text-gray-500">Vendas</p>
                <h4 className="text-3xl font-bold mt-2">R$ 12k</h4>
              </div>

              <div className="bg-gray-100 rounded-2xl p-6">
                <p className="text-gray-500">Pedidos</p>
                <h4 className="text-3xl font-bold mt-2">320</h4>
              </div>

              <div className="bg-gray-100 rounded-2xl p-6">
                <p className="text-gray-500">Clientes</p>
                <h4 className="text-3xl font-bold mt-2">1.2k</h4>
              </div>

            </div>

            {/* Gráfico fake animado */}
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl h-64 flex items-end gap-6 p-6 border border-white/20 shadow-2xl overflow-hidden">

              <div className="w-16 h-24 bg-gradient-to-t from-cyan-400 to-blue-600 rounded-xl animate-pulse"></div>

              <div className="w-16 h-40 bg-gradient-to-t from-cyan-400 to-blue-600 rounded-xl animate-bounce"></div>

              <div className="w-16 h-32 bg-gradient-to-t from-cyan-400 to-blue-600 rounded-xl animate-pulse"></div>

              <div className="w-16 h-52 bg-gradient-to-t from-cyan-400 to-blue-600rounded-xl animate-bounce"></div>

              <div className="w-16 h-44 bg-gradient-to-t from-cyan-400 to-blue-600rounded-xl animate-pulse"></div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;