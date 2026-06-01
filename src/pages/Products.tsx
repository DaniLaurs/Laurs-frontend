import Sidebar from "../components/Sidebar";


function Products() {
  const products = [
    {
      id: 1,
      name: "Camiseta Premium",
      price: 79.90,
      stock: 15,
    },
    {
      id: 2,
      name: "Caneca Laurs",
      price: 39.90,
      stock: 23,
    },
    {
      id: 3,
      name: "Mouse Gamer",
      price: 129.90,
      stock: 8,
    },
  ];

  return (
  <div className="min-h-screen bg-[#f5f7ff] flex">

    <Sidebar />

    <main className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Produtos 📦
        </h1>

        <p className="text-gray-500 mt-2">
            {products.length} produtos cadastrados
        </p>

        <button className="bg-cyan-500 text-white px-6 py-3 rounded-xl hover:bg-cyan-600 transition">
         ➕  Novo Produto
        </button>

      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Produto</th>
              <th className="text-left p-4">Preço</th>
              <th className="text-left p-4">Estoque</th>
              <th className="text-left p-4">Ações</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                    {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                    </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4 flex gap-2">

                  <button className="bg-yellow-400 px-3 py-1 rounded-lg">
                    Editar
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                    Excluir
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
     </main>
    </div>
  );
}

export default Products;