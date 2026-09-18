import { useCart } from "../../context/useCart";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export function CartSummary() {
  const { cartItems,  clearCart } = useCart();


  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    const response = await fetch(
      "http://localhost:3333/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      }
    );

    const data = await response.json();

    console.log("PEDIDO CRIADO:", data);

    if (!response.ok) {
      alert(data.error || "Erro ao finalizar compra.");
      return;
    }

    clearCart();

    navigate("/dashboard/orders");

  } catch (error) {
    console.log("ERRO AO FINALIZAR:", error);

    alert("Erro ao finalizar compra.");
  }
};

  return (
        <div
        className="
          bg-surface
          border
          border-border
          rounded-3xl
          shadow-sm
          p-6
          h-fit
        "
      >

      <h2 className="text-2xl font-bold text-text mb-6">
        Resumo do Pedido
      </h2>

      <div className="flex justify-between mb-3">
       <span className="text-textLight">
          Subtotal
        </span>

        <span>
          {subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </span>
      </div>

      <div className="flex justify-between mb-3">
       <span className="text-textLight">
            Frete
          </span>

        <span className="text-text">Grátis</span>
      </div>

      <hr className="my-5" />

      <div className="flex justify-between text-xl font-bold text-text">
        <span>
          Total
        </span>
        <span className="text-primary">
          {subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </span>

      </div>

      <Button
       onClick={handleCheckout}
        className="
          w-full
          mt-6
          from-violet-600 to-purple-600
          text-white
          py-4
          rounded-xl
          font-bold
        "
      >
        Finalizar Compra
      </Button>

    </div>
  );
}