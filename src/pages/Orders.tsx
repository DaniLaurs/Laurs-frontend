import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import { CalendarDays, Clock, Package, Store, XCircle } from "lucide-react";
import api from "../services/api"

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
  variant?: {
    id: string;
    color?: string;
    size?: string;
  } | null;
}

interface Order {
  id: string;
  total: number;
  status?: string;
  createdAt: string;

  store: {
    id: string;
    name: string;
  };

  items: OrderItem[];
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cancellationReason, setCancellationReason] = useState("");
const [requestingCancellationId, setRequestingCancellationId] = useState<string | null>(null);

useEffect(() => {
  const loadOrders = async () => {
    try {
      let response;

      try {
        // Primeiro tenta buscar os pedidos do vendedor
        response = await api.get("/orders/seller-dashboard");

        const data = response.data;

        console.log("PEDIDOS DO VENDEDOR:", data.recentOrders);

        setOrders(data.recentOrders);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // Se não tiver loja, busca os pedidos do comprador
        if (error.response?.status === 404) {
          response = await api.get("/orders");

          console.log("PEDIDOS DO COMPRADOR:", response.data);

          setOrders(response.data);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.log("ERRO AO BUSCAR PEDIDOS:", error);
    } finally {
      setLoading(false);
    }
  };

  loadOrders();
}, []);

const filteredOrders =
  statusFilter === "ALL"
    ? orders
    : orders.filter((order) => order.status === statusFilter);

    useEffect(() => {
  console.log(
    "PEDIDOS FILTRADOS:",
    filteredOrders.map((order) => ({
      id: order.id,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
    }))
  );
}, [filteredOrders]);

  
async function handleCancelOrder(orderId: string) {
  const confirmed = window.confirm(
    "Tem certeza que deseja cancelar este pedido?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setCancelingId(orderId);

    const response = await api.put(
      `/orders/${orderId}/cancel`
    );

    const updatedOrder = response.data;

    console.log("PEDIDO CANCELADO:", updatedOrder);

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: updatedOrder.status,
            }
          : order
      )
    );
  } catch (error) {
    console.log("ERRO AO CANCELAR PEDIDO:", error);
    alert("Não foi possível cancelar o pedido.");
  } finally {
    setCancelingId(null);
  }
}


async function handleRequestCancellation(orderId: string) {
  if (!cancellationReason.trim()) {
    alert("Informe o motivo do cancelamento.");
    return;
  }

  try {
    setRequestingCancellationId(orderId);

    await api.put(`/orders/${orderId}/request-cancellation`, {
      cancellationReason: cancellationReason.trim(),
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "CANCELLATION_REQUESTED" }
          : order
      )
    );

    setCancellationReason("");

    alert("Solicitação de cancelamento enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao solicitar cancelamento:", error);
    alert("Não foi possível solicitar o cancelamento.");
  } finally {
    setRequestingCancellationId(null);
  }
}


  function getStatusLabel(status?: string) {
    switch (status) {
      case "PENDING":
        return "Pendente";

      case "PROCESSING":
        return "Processando";

      case "SHIPPED":
        return "Enviado";

      case "COMPLETED":
        return "Concluído";

      case "CANCELLED":
        return "Cancelado";

      default:
        return "Pendente";
    }
  }

  function getStatusClass(status?: string) {
    switch (status) {
      case "PENDING":
        return "bg-warning/10 text-warning";

      case "PROCESSING":
        return "bg-primary/10 text-primary";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "COMPLETED":
        return "bg-success/10 text-success";

      case "CANCELLED":
        return "bg-danger/10 text-danger";

      default:
        return "bg-warning/10 text-warning";
    }
  }

  function getStatusStep(status?: string) {
  switch (status) {
    case "PENDING":
      return 1;
    case "PROCESSING":
      return 2;
    case "SHIPPED":
      return 3;
    case "COMPLETED":
      return 4;
    default:
      return 0;
  }
}

  return (
  <>
    <PageHeader
      title="Pedidos"
      subtitle="Acompanhe seus pedidos e veja o andamento das suas compras."
      backTo="/dashboard"
    />

    <div className="max-w-6xl mx-auto mt-8 px-4 pb-10">
      {loading ? (
        <div
          className="
            bg-surface
            border
            border-border
            rounded-3xl
            shadow-sm
            p-12
            text-center
          "
        >
          <Package
            size={40}
            className="mx-auto mb-4 text-primary"
          />

          <p className="text-textLight text-lg">
            Carregando pedidos...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div
          className="
            bg-surface
            border
            border-border
            rounded-3xl
            shadow-sm
            p-12
            text-center
          "
        >
          <Package
            size={48}
            className="mx-auto mb-4 text-textLight"
          />

          <h2 className="text-xl font-bold text-text mb-2">
            Nenhum pedido encontrado
          </h2>

          <p className="text-textLight">
            Quando você realizar uma compra, seus pedidos aparecerão aqui.
          </p>
        </div>
      ) : (
        <div>
          {/* FILTROS */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                statusFilter === "ALL"
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-textLight hover:border-primary hover:text-primary"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setStatusFilter("PENDING")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                statusFilter === "PENDING"
                  ? "bg-warning text-white"
                  : "bg-surface border border-border text-textLight hover:border-warning hover:text-warning"
              }`}
            >
              Pendentes
            </button>

            <button
              onClick={() => setStatusFilter("PROCESSING")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                statusFilter === "PROCESSING"
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-textLight hover:border-primary hover:text-primary"
              }`}
            >
              Processando
            </button>

            <button
              onClick={() => setStatusFilter("COMPLETED")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                statusFilter === "COMPLETED"
                  ? "bg-success text-white"
                  : "bg-surface border border-border text-textLight hover:border-success hover:text-success"
              }`}
            >
              Concluídos
            </button>

            <button
              onClick={() => setStatusFilter("CANCELLED")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                statusFilter === "CANCELLED"
                  ? "bg-danger text-white"
                  : "bg-surface border border-border text-textLight hover:border-danger hover:text-danger"
              }`}
            >
              Cancelados
            </button>
          </div>

          {/* LISTA DE PEDIDOS */}
          <div className="space-y-6">
            
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="
                  bg-surface
                  border
                  border-border
                  rounded-3xl
                  shadow-sm
                  overflow-hidden
                  transition
                  hover:shadow-md
                "
              >

    

                
                {/* CABEÇALHO DO PEDIDO */}
                <div
                  className="
                    p-6
                    border-b
                    border-border
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  "
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Store
                        size={20}
                        className="text-primary"
                      />

                      <h2 className="text-xl font-bold text-text">
                        {order.store.name}
                      </h2>
                    </div>

                    <p className="text-sm text-textLight">
                      Pedido #{order.id.slice(0, 8)}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-textLight">
                      <CalendarDays size={15} />

                      {new Date(order.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}

                      <span>•</span>

                      <Clock size={15} />

                      {new Date(order.createdAt).toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>

                  {/* TOTAL + STATUS */}
                  <div className="text-left md:text-right">
                    <p className="text-sm text-textLight">
                      Total do pedido
                    </p>

                    <p className="text-2xl font-bold text-primary">
                      {order.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <span
                      className={`
                        inline-block
                        mt-2
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${getStatusClass(order.status)}
                      `}
                    >
                      {getStatusLabel(order.status)}
                    </span>

                    <button
  type="button"
  onClick={() => {
    console.log("CLIQUE NO BOTÃO:", order.id);
    window.location.href = `/dashboard/orders/${order.id}`;
  }}
    style={{
  background: "#7C3AED",
  color: "white",
  padding: "8px 14px",
  marginTop: "12px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
}}
  
>
  Ver detalhes
</button>
                                
                  </div>
                </div>

                              {/* LINHA DO TEMPO */}
              {order.status !== "CANCELLED" && (
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-between">

                    {[1, 2, 3, 4].map((step) => {
                      const currentStep = getStatusStep(order.status);
                      const completed = step <= currentStep;

                      return (
                       <div key={step}
                        className="flex flex-col items-center flex-1" >
                          <div
                            className={`
                              relative z-10
                              w-8 h-8
                              rounded-full
                              flex
                              items-center
                              justify-center
                              text-sm
                              font-bold
                              transition-all
                              ${
                                completed
                                  ? "bg-primary text-white"
                                  : "bg-gray-200 text-gray-500"
                              }
                            `}
                          >
                            {step}
                          </div>

                          <p className="text-xs text-textLight text-center ml-2">
                      {step === 1 && "Pendente"}
                      {step === 2 && "Processando"}
                      {step === 3 && "Enviado"}
                      {step === 4 && "Concluído"}
                    </p>

                      {step < 4 && ( <div 
                      className={` 
                        absolute 
                        top-4 
                        left-1/2
                        w-
                        h-1 
                        z-0
                        rounded-full 
                        transition-all
                         ${ 
                          step < currentStep
                           ? "bg-primary" 
                           : "bg-gray-200" 
                           }
                            `} 
                            />
                             )}
                        </div>
                      );
                    })}

                  </div>
                </div>
              )}

                {/* PRODUTOS */}
                <div className="p-6">
                  <h3 className="font-semibold text-text mb-4">
                    Produtos
                  </h3>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          border
                          border-border
                          rounded-2xl
                          p-4
                          transition
                          hover:shadow-sm
                        "
                      >
                        {/* IMAGEM */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-background border border-border shrink-0">
                          {item.product.images?.length > 0 ? (
                            <img
                              src={item.product.images?.[0]?.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-textLight">
                              <Package size={24} />
                            </div>
                          )}
                        </div>

                        {/* INFORMAÇÕES */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text truncate">
                            {item.product.name}
                          </p>

                          {item.variant && (
                            <p className="text-sm text-textLight mt-1">
                              {item.variant.color &&
                                item.variant.color}

                              {item.variant.color &&
                                item.variant.size &&
                                " • "}

                              {item.variant.size &&
                                item.variant.size}
                            </p>
                          )}

                          <p className="text-sm text-textLight mt-1">
                            Quantidade: {item.quantity}
                          </p>
                        </div>

                        {/* PREÇO */}
                        <p className="font-semibold text-text shrink-0">
                          {(item.price * item.quantity).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* AÇÃO */}
                  {order.status === "PENDING" && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() =>
                          handleCancelOrder(order.id)
                        }
                        disabled={cancelingId === order.id}
                        className="
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          border
                          border-danger
                          text-danger
                          hover:bg-danger/10
                          transition
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                        "
                      >
                        <XCircle size={18} />

                        {cancelingId === order.id
                          ? "Cancelando..."
                          : "Cancelar pedido"}
                      </button>
                    </div>
                 
                  )}

                  {/* SOLICITAR CANCELAMENTO */}
                  {order.status === "PROCESSING" && (
                    <div className="mt-6 space-y-3">
                      <textarea
                        value={cancellationReason}
                        onChange={(e) =>
                          setCancellationReason(e.target.value)
                        }
                        placeholder="Informe o motivo do cancelamento..."
                        rows={3}
                        className="w-full rounded-xl border border-border bg-surface p-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            handleRequestCancellation(order.id)
                          }
                          disabled={
                            requestingCancellationId === order.id
                          }
                          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                        >
                          {requestingCancellationId === order.id
                            ? "Enviando..."
                            : "Solicitar cancelamento"}
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </>
);
}
  

export default Orders;