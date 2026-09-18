
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Store,
  TrendingUp,
  ShoppingBag,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react";

interface StoreData {
  id: string;
  name: string;
  description: string;
  slug: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    images: {
      id: string;
      imageUrl: string;
    }[];
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface DashboardData {
  store: StoreData;
  stats: {
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
  };
  recentOrders: Order[];
}

function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3333/orders/seller-dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erro ao buscar dashboard do vendedor"
          );
        }

        const data = await response.json();

        console.log("🔥 DASHBOARD VENDEDOR:", data);

        setDashboard(data);
      } catch (error) {
        console.log(
          "ERRO AO BUSCAR DASHBOARD:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  function getStatusLabel(status: string) {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "PROCESSING":
        return "Processando";
      case "COMPLETED":
        return "Concluído";
      case "CANCELLED":
        return "Cancelado";
      default:
        return status;
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-warning/10 text-warning";
      case "PROCESSING":
        return "bg-primary/10 text-primary";
      case "COMPLETED":
        return "bg-success/10 text-success";
      case "CANCELLED":
        return "bg-danger/10 text-danger";
      default:
        return "bg-background text-textLight";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-border rounded-xl w-72" />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-32 bg-surface rounded-3xl border border-border" />
            <div className="h-32 bg-surface rounded-3xl border border-border" />
            <div className="h-32 bg-surface rounded-3xl border border-border" />
          </div>

          <div className="h-64 bg-surface rounded-3xl border border-border" />
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-background p-8">
        <h1 className="text-3xl font-bold text-text">
          Olá, {user?.name}
        </h1>

        <div className="mt-8 bg-surface rounded-3xl p-8 border border-border">
          <p className="text-textLight">
            Não foi possível carregar os dados da sua loja.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text">
          Olá, {user?.name} 👋
        </h1>

        <p className="text-textLight mt-2">
          Aqui está o resumo da sua loja.
        </p>
      </div>

      
      <div className="grid md:grid-cols-3 gap-6">

  {/* FATURAMENTO */}

  <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-textLight">
          Faturamento
        </p>

        <h2 className="text-3xl font-bold text-text mt-2">
          {dashboard.stats.totalRevenue.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
        </h2>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <TrendingUp
          size={24}
          className="text-primary"
        />
      </div>

    </div>

    <div className="mt-5 pt-4 border-t border-border">
      <p className="text-sm text-textLight">
        Receita total dos pedidos
      </p>
    </div>

  </div>


  {/* PEDIDOS */}

  <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-textLight">
          Pedidos
        </p>

        <h2 className="text-3xl font-bold text-text mt-2">
          {dashboard.stats.totalOrders}
        </h2>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <ShoppingBag
          size={24}
          className="text-primary"
        />
      </div>

    </div>

    <div className="mt-5 pt-4 border-t border-border">
      <p className="text-sm text-textLight">
        Total de pedidos recebidos
      </p>
    </div>

  </div>


  {/* PRODUTOS VENDIDOS */}

  <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-textLight">
          Produtos vendidos
        </p>

        <h2 className="text-3xl font-bold text-text mt-2">
          {dashboard.stats.totalProducts}
        </h2>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Package
          size={24}
          className="text-primary"
        />
      </div>

    </div>

    <div className="mt-5 pt-4 border-t border-border">
      <p className="text-sm text-textLight">
        Unidades vendidas
      </p>
      

    </div>
</div>

  </div>




          
  

      <div className="bg-surface rounded-3xl p-8 shadow-sm border border-border mt-8">

        <div className="flex items-center gap-3 mb-4">
          <Store
            size={24}
            className="text-primary"
          />

          <h2 className="text-2xl font-bold text-text">
            Minha Loja
          </h2>
        </div>

        <h3 className="text-xl font-semibold text-text">
          {dashboard.store.name}
        </h3>

        <p className="text-textLight mt-2">
          {dashboard.store.description}
        </p>

        <div className="flex gap-4 mt-6 flex-wrap">

          <Link
            to={`/store/${dashboard.store.slug}`}
            className="
              bg-gradient-to-r
              from-primary
              to-primaryHover
              text-white
              px-6
              py-3
              rounded-2xl
              transition-all
              hover:scale-105
              hover:shadow-primary
            "
          >
            Ver Loja
          </Link>

          <Link
            to="/dashboard/products"
            className="
              bg-secondary
              text-primary
              px-6
              py-3
              rounded-2xl
              transition-all
              hover:scale-105
            "
          >
            Produtos
          </Link>

        </div>

      </div>

              
          <div className="bg-surface rounded-3xl p-8 shadow-sm border border-border mt-8">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">
                <Clock
                  size={24}
                  className="text-primary"
                />

                <h2 className="text-2xl font-bold text-text">
                  Pedidos recentes
                </h2>
              </div>

              <Link
                to="/dashboard/orders"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Ver todos
                <ArrowRight size={18} />
              </Link>

            </div>

            {dashboard.recentOrders.length === 0 ? (

              <div className="py-12 text-center text-textLight">

                <ShoppingBag
                  size={40}
                  className="mx-auto mb-3"
                />

                <p>
                  Ainda não existem pedidos.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {dashboard.recentOrders.map((order) => {

                  const firstItem = order.items[0];

                  return (
                    <div
                      key={order.id}
                      className="
                        p-5
                        rounded-2xl
                        bg-background
                        border
                        border-border
                        hover:shadow-sm
                        transition-all
                      "
                    >

                      {/* CABEÇALHO DO PEDIDO */}

                      <div className="flex items-center justify-between gap-4 mb-4">

                        <div>

                          <p className="font-bold text-text">
                            Pedido #{order.id.slice(0, 8)}
                          </p>

                          <p className="text-sm text-textLight mt-1">
                            👤 {order.user?.name ?? "Cliente"}
                          </p>

                        </div>

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${getStatusClass(order.status)}
                          `}
                        >
                          {getStatusLabel(order.status)}
                        </span>

                      </div>

                      {/* CONTEÚDO */}

                      <div className="flex items-center justify-between gap-6">

                        {/* PRODUTO */}

                        <div className="flex items-center gap-4 min-w-0">

                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface border border-border shrink-0">

                            {firstItem?.product.images?.[0]?.imageUrl ? (

                              <img
                                src={firstItem.product.images[0].imageUrl}
                                alt={firstItem.product.name}
                                className="w-full h-full object-cover"
                              />

                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-textLight">
                                <Package size={22} />
                              </div>

                            )}

                          </div>

                          <div className="min-w-0">

                            <p className="font-semibold text-text truncate">
                              {firstItem?.product.name ?? "Produto"}
                            </p>

                            <p className="text-sm text-textLight mt-1">
                              📦 Quantidade: {firstItem?.quantity ?? 0}
                            </p>

                          </div>

                        </div>

                        {/* INFORMAÇÕES */}

                        <div className="hidden md:flex items-center gap-8">

                          <div>

                            <p className="text-xs text-textLight">
                              Valor
                            </p>

                            <p className="font-bold text-text">
                              {order.total.toLocaleString(
                                "pt-BR",
                                {
                                  style: "currency",
                                  currency: "BRL",
                                }
                              )}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-textLight">
                              Data
                            </p>

                            <p className="text-sm font-medium text-text">
                              {new Date(
                                order.createdAt
                              ).toLocaleDateString("pt-BR")}
                            </p>

                          </div>

                        </div>

                        {/* DETALHES */}

                        <Link
                          to={`/dashboard/orders/${order.id}`}
                          className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            bg-secondary
                            text-primary
                            font-medium
                            text-sm
                            transition-all
                            hover:scale-105
                          "
                        >
                          Ver detalhes
                          <ArrowRight size={16} />
                        </Link>

                      </div>

                      {/* INFORMAÇÕES MOBILE */}

                      <div className="flex md:hidden items-center justify-between mt-4 pt-4 border-t border-border">

                        <div>

                          <p className="text-xs text-textLight">
                            Valor
                          </p>

                          <p className="font-bold text-text">
                            {order.total.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-xs text-textLight">
                            Data
                          </p>

                          <p className="text-sm font-medium text-text">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString("pt-BR")}
                          </p>

                        </div>

                      </div>

                    </div>
                  );

                })}

              </div>

            )}

          </div>

            </div>
              );
            }

            export default Dashboard;
