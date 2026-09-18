import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  TrendingUp,
  ShoppingBag,
  Users,
} from "lucide-react";

function DashboardPreview() {
  return (
    <section className="w-full flex justify-center px-6 pb-32">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">

        <div className="flex">

          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 pr-6">

            <h2 className="text-2xl font-bold mb-8">
               <LayoutDashboard size={24} />
              Dashboard
            </h2>

            <div className="flex flex-col gap-4 text-gray-600">

          <Link
                to="/dashboard"
                className="
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-xl
              text-textLight
              hover:bg-secondary
              hover:text-primary
              transition
             group-hover:text-white
"
              >
                <LayoutDashboard size={20} />

                Dashboard
              </Link>

             <Link
                to="/dashboard/products"
                className="
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2
                  rounded-xl
                  text-textLight
                  hover:bg-secondary
                  hover:text-primary
                  transition
                group-hover:text-white
                "
             >
                <Package size={20} />

                Produtos
              </Link>

              <Link
              to="/dashboard/orders"
              className="
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-xl
                text-textLight
                hover:bg-secondary
                hover:text-primary
                transition
              group-hover:text-white
              "
            >
              <ShoppingCart size={20} />

              Pedidos
            </Link>

              <Link
                to="/dashboard/settings"
                className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2
                    rounded-xl
                    text-textLight
                    hover:bg-secondary
                    hover:text-primary
                    transition
                  group-hover:text-white
                  "
              >
                <Settings size={20} />

                Configurações
              </Link>
            </div>

          </div>

          {/* Conteúdo */}
          <div className="flex-1 pl-8">

            <div className="flex items-center justify-between mb-10">

              <div>
               <h3 className="text-3xl font-bold">
                   Bem-vinda de volta
                </h3>

                <p className="text-gray-500 mt-2">
                  Veja os dados da sua loja.
                </p>
              </div>

              <div className="flex items-center gap-4">

               

                <Link
                  to="/dashboard/products"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-3 rounded-2xl hover:scale-102 hover:shadow-hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]  transition-all
                  duration-300
                  ease-out
                  hover:scale-105
                  hover:shadow-primary
                  active:scale-95"
                                >
                  Novo produto
                </Link>

              </div>

            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">

              <div className="
                      group
                      bg-surface
                      border
                      border-border
                      rounded-2xl
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-primary
                      hover:border-primary/30
                    ">
                <p className="text-gray-500">Vendas</p>
                <h4 className="text-3xl font-bold mt-2">
                  R$ 12k
                </h4>
              </div>

                 <div className="bg-secondary p-3 rounded-xl">
                  <TrendingUp
                    size={26}
                    className="text-primary"
                  />
                </div>

               <div className="
                  group
                  bg-surface
                  border
                  border-border
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-primary
                  hover:border-primary/30
                ">
                 <p className="text-gray-500">Pedidos</p>
                <h4 className="text-3xl font-bold mt-2">
                  320
                </h4>
              </div>


              <div className="bg-secondary p-3 rounded-xl">
                <ShoppingBag
                  size={26}
                  className="text-primary"
                />
              </div>

              <div className="
                      group
                      bg-surface
                      border
                      border-border
                      rounded-2xl
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-primary
                      hover:border-primary/30
                    ">
                <p className="text-gray-500">Clientes</p>
                <h4 className="text-3xl font-bold mt-2">
                  1.2k
                </h4>
              </div>

                  <div className="bg-secondary p-3 rounded-xl">
                  <Users
                    size={26}
                    className="text-primary"
                  />
                </div>

            </div>

            {/* Gráfico fake */}
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl h-64 flex items-end gap-6 p-6 border border-white/20 shadow-2xl overflow-hidden">

              <div className="w-16 h-24 bg-gradient-to-t from-primary
to-primary Hover rounded-xl animate-pulse"></div>

              <div className="w-16 h-40 bg-gradient-to-t from-primary
to-primaryHover rounded-xl animate-bounce"></div>

              <div className="w-16 h-32 bg-gradient-to-t from-primary
to-primaryHover rounded-xl animate-pulse"></div>

              <div className="w-16 h-52 bg-gradient-to-t from-primary
to-primaryHover rounded-xl animate-bounce"></div>

              <div className="w-16 h-44 bg-gradient-to-t from-primary
to-primaryHover rounded-xl animate-pulse"></div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;