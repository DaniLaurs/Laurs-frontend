import { CartItem } from "../components/Cart/CartItem";
import { CartSummary } from "../components/Cart/CartSummary";
import { useCart } from "../context/useCart";
import PageHeader from "../components/ui/PageHeader";
import PageBackground from "../components/Layout/PageBackground";

function Cart() {
  const { cartItems } = useCart();
    console.log("CARRINHO NA PÁGINA:", cartItems);

return (
      <PageBackground>
      <div className="min-h-screen bg-background p-10">

      <PageHeader
      title="Carrinho"
      subtitle="Revise seus produtos antes de finalizar a compra."
      backTo="/dashboard"
    />



    <div className="max-w-6xl mx-auto">


      {cartItems.length === 0 ? (

        <div className="
            bg-surface
            border
            border-border
            rounded-3xl
            shadow-sm
            p-12
            text-center
          ">
          <p className="text-textLight text-lg">
            Seu carrinho está vazio.
          </p>
        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-10 items-start">

          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item) => (
            <CartItem
              key={`${item.id}-${item.variant?.id ?? "default"}`}
              item={item}
            />
            ))}

          </div>

          <CartSummary />

        </div>

      )}

    </div>

  </div>
    </PageBackground>
  

);
}

export default Cart;