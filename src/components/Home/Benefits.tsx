function Benefits() {
  return (
    <section className="w-full py-32 px-6">
      
      <div className="max-w-6xl mx-auto text-center">
        
        <h2 className="text-5xl font-bold">
          Tudo que você precisa para vender online
        </h2>

        <p className="text-gray-500 text-xl mt-6 max-w-3xl mx-auto">
          Gerencie produtos, pedidos, clientes e métricas em uma plataforma
          moderna e intuitiva.
        </p>

        <div className="grid grid-cols-3 gap-8 mt-20">
          
          <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-10 border border-white/40 shadow-2xl cursor-pointer transform hover:-translate-y-6 hover:scale-110 hover:shadow-[0_20px_60px_rgba(59,130,246,0.35)] duration-500">
            <div className="text-5xl mb-6">📦</div>

            <h3 className="text-2xl font-bold mb-4">
              Produtos
            </h3>

            <p className="text-gray-500">
              Gerencie sua loja de forma simples e organizada.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-10 border border-white/40 shadow-2xl cursor-pointer transform hover:-translate-y-6 hover:scale-110 hover:shadow-[0_20px_60px_rgba(59,130,246,0.35)] duration-500">
            <div className="text-5xl mb-6">📈</div>

            <h3 className="text-2xl font-bold mb-4">
              Analytics
            </h3>

            <p className="text-gray-500">
              Veja métricas importantes em tempo real.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-10 border border-white/40 shadow-2xl cursor-pointer transform hover:-translate-y-6 hover:scale-110 hover:shadow-[0_20px_60px_rgba(59,130,246,0.35)] duration-500">
            <div className="text-5xl mb-6">🛒</div>

            <h3 className="text-2xl font-bold mb-4">
              Pedidos
            </h3>

            <p className="text-gray-500">
              Controle pedidos e acompanhe vendas facilmente.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Benefits;