import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";


export default function Header() {

  const navigate = useNavigate();

  const { cartItems } = useCart();


  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (
    <header
      className="
        w-full
        bg-white
        shadow-sm
        px-8
        py-4
        flex
        items-center
        justify-between
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          text-cyan-600
          cursor-pointer
        "
        onClick={() => navigate("/")}
      >
        LaurS
      </h1>


      <button
        onClick={() => navigate("/cart")}
        className="
          relative
          flex
          items-center
          gap-2
          text-gray-700
          hover:text-cyan-600
        "
      >

        <ShoppingCart size={28} />


        {totalItems > 0 && (
          <span
            className="
              absolute
              -top-3
              -right-3
              bg-cyan-500
              text-white
              text-xs
              font-bold
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {totalItems}
          </span>
        )}

      </button>


    </header>
  );
}