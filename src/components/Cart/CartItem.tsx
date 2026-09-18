import type { CartItem as CartItemType } from "../../context/CartContext";
import { useCart } from "../../context/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {

    const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  return (
    <div
        className="
          bg-surface
          border
          border-border
          rounded-3xl
          shadow-sm
          p-6
          flex
          items-center
          gap-6
          transition-all
          hover:shadow-lg
        "
      >

      <img
        src={item.image}
        alt={item.name}
       className="
        w-28
        h-28
        object-cover
        rounded-2xl
        border
        border-border
"
      />

      <div className="flex-1">

        <h2 className="text-xl font-semibold text-text">
          {item.name}
        </h2>
              {item.variant && (
        <p className="mt-1 text-sm text-textLight">
          {item.variant.color} • {item.variant.size}
        </p>
      )}

        <p className="text-primary text-lg font-bold mt-2">
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
         </p>
          <div className="flex items-center gap-3 mt-4">

            <button
              onClick={() => decreaseQuantity(item)}
              className="
                w-10
                h-10
                rounded-xl
                bg-secondary
                hover:bg-secondaryHover
                flex
                items-center
                justify-center
                transition
              "
            >
              <Minus size={16} />
            </button>

           <span className="font-bold text-lg min-w-[24px] text-center">
            {item.quantity}
          </span>

            <button
          onClick={() => increaseQuantity(item)}
          className="
            w-10
            h-10
            rounded-xl
            bg-primary
            hover:bg-primaryHover
            text-white
            flex
            items-center
            justify-center
            transition
          "
        >
          <Plus size={16} />
        </button>

            <button
            onClick={() => removeFromCart(item)}
              className="
                  ml-auto
                  text-danger
                  hover:text-dangerHover
                  transition
                  "
            >
              <Trash2 size={18} />
            </button>

          </div>

      </div>

    </div>
  );
}