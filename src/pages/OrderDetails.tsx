import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  Calendar,
  ShoppingBag,
} from "lucide-react";

interface ProductImage {
  id: string;
  imageUrl: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: ProductImage[];
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
  variant?: {
    id: string;
    color?: string;
    size?: string;
    stock: number;
  } | null;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
}

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Pendente";

    case "PROCESSING":
      return "Em preparação";

    case "SHIPPED":
      return "Enviado";

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
      return "bg-yellow-100 text-yellow-700";

    case "PROCESSING":
      return "bg-blue-100 text-blue-700";

    case "SHIPPED":
      return "bg-purple-100 text-purple-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
const updateOrderStatus = async (newStatus: string) => {
  if (!order) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3333/orders/${order.id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Erro ao atualizar status"
      );
    }

    setOrder((currentOrder) =>
      currentOrder
        ? {
            ...currentOrder,
            status: data.status,
          }
        : currentOrder
    );
  } catch (error) {
    console.log(
      "ERRO AO ATUALIZAR STATUS:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Erro ao atualizar status"
    );
  }
};


const getNextStatus = (status: string) => {
  switch (status) {
    case "PENDING":
      return "PROCESSING";

    case "PROCESSING":
      return "SHIPPED";

    case "SHIPPED":
      return "COMPLETED";

    default:
      return null;
  }
};

const cancelOrder = async () => {
  if (!order) return;

  const confirmed = window.confirm(
    "Tem certeza que deseja cancelar este pedido?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3333/orders/${order.id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "CANCELLED",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Erro ao cancelar pedido"
      );
    }

    setOrder((currentOrder) =>
      currentOrder
        ? {
            ...currentOrder,
            status: data.status,
          }
        : currentOrder
    );
  } catch (error) {
    console.log(
      "ERRO AO CANCELAR PEDIDO:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Erro ao cancelar pedido"
    );
  }
};







  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3333/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Erro ao buscar pedido"
          );
        }

        setOrder(data);
      } catch (error) {
        console.log("ERRO AO BUSCAR PEDIDO:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Erro ao buscar pedido"
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-textLight">
          Carregando pedido...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">
          {error || "Pedido não encontrado"}
        </p>

        <Link
          to="/dashboard/orders"
          className="flex items-center gap-2 text-primary font-medium"
        >
          <ArrowLeft size={18} />
          Voltar para pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/dashboard/orders"
              className="flex items-center gap-2 text-textLight hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              Voltar para pedidos
            </Link>

            <h1 className="text-3xl font-bold text-text">
              Pedido #{order.id.slice(0, 8)}
            </h1>

            <p className="text-textLight mt-2">
              Detalhes do pedido
            </p>
          </div>

                    
                <div className="flex flex-col items-end gap-3">
                <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusClass(
                    order.status
                    )}`}
                >
                    {getStatusLabel(order.status)}
                </span>

                {getNextStatus(order.status) && (
                    <button
                    onClick={() =>
                        updateOrderStatus(
                        getNextStatus(order.status)!
                        )
                    }
                    className="px-4 py-2 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primaryHover transition-all hover:scale-105"
                    >
               
                    {order.status === "PENDING" &&
                        "Marcar como em preparação"}

                    {order.status === "PROCESSING" &&
                        "Marcar como enviado"}

                    {order.status === "SHIPPED" &&
                        "Marcar como concluído"}
                    </button>
                )}

                                
                {(order.status === "PENDING" ||
                  order.status === "PROCESSING") && (
                  <button
                    onClick={cancelOrder}
                    className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-all"
                  >
                    Cancelar pedido
                  </button>
                )}


                </div>


        </div>

        {/* INFORMAÇÕES PRINCIPAIS */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* CLIENTE */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User
                  size={22}
                  className="text-primary"
                />
              </div>

              <h2 className="text-lg font-bold text-text">
                Cliente
              </h2>
            </div>

            <p className="font-semibold text-text">
              {order.user.name}
            </p>

            <p className="text-sm text-textLight mt-1">
              {order.user.email}
            </p>
          </div>

          {/* DATA */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calendar
                  size={22}
                  className="text-primary"
                />
              </div>

              <h2 className="text-lg font-bold text-text">
                Data do pedido
              </h2>
            </div>

            <p className="font-semibold text-text">
              {new Date(order.createdAt).toLocaleDateString(
                "pt-BR"
              )}
            </p>

            <p className="text-sm text-textLight mt-1">
              {new Date(order.createdAt).toLocaleTimeString(
                "pt-BR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>

          {/* TOTAL */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag
                  size={22}
                  className="text-primary"
                />
              </div>

              <h2 className="text-lg font-bold text-text">
                Total
              </h2>
            </div>

            <p className="text-3xl font-bold text-text">
              {order.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        {/* PRODUTOS */}
        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm mt-6">
          <div className="flex items-center gap-3 mb-6">
            <Package
              size={24}
              className="text-primary"
            />

            <h2 className="text-xl font-bold text-text">
              Produtos do pedido
            </h2>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 p-4 rounded-2xl bg-background border border-border"
              >
                {/* IMAGEM */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface border border-border shrink-0">
                  {item.product.images?.[0]?.imageUrl ? (
                    <img
                      src={item.product.images[0].imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-textLight">
                      <Package size={24} />
                    </div>
                  )}
                </div>

                {/* PRODUTO */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-textLight mt-1">
                    Quantidade: {item.quantity}
                  </p>

                  {item.variant && (
                    <p className="text-sm text-textLight mt-1">
                      {item.variant.color &&
                        `Cor: ${item.variant.color}`}

                      {item.variant.color &&
                        item.variant.size &&
                        " • "}

                      {item.variant.size &&
                        `Tamanho: ${item.variant.size}`}
                    </p>
                  )}
                </div>

                {/* PREÇO */}
                <div className="text-right">
                  <p className="font-bold text-text">
                    {item.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <p className="text-xs text-textLight mt-1">
                    unidade
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-end mt-6 pt-6 border-t border-border">
            <div className="text-right">
              <p className="text-sm text-textLight">
                Total do pedido
              </p>

              <p className="text-2xl font-bold text-text mt-1">
                {order.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
