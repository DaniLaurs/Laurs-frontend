import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext, useState } from "react";

interface ProductImage {
  id: string;
  imageUrl: string;
}

interface ProductCardProps {
  id: string;
  storeId: string;
  name: string;
  price: number;
  category: string;
  image?: ProductImage;
}

export default function ProductCard({
  id,
 storeId,
  name,
  price,
  category,
  image,
}: ProductCardProps) {

const cart = useContext(CartContext);

  const [added, setAdded] = useState(false);


  if (!cart) {
    return null;
  }

  const { addToCart } = cart;


  function handleAddToCart() {

  addToCart({
    id,
    storeId,
    name,
    price,
    image: image?.imageUrl ?? "",
    quantity: 1,
  });

    setAdded(true);


  setTimeout(() => {
    setAdded(false);
  }, 2000);

}
  
  return (
    <Link
      to={`/product/${id}`}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* Imagem */}
      <div className="overflow-hidden">
        {image ? (
          <img
            src={image.imageUrl}
            alt={name}
            className="
              w-full
              h-60
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              h-60
              flex
              items-center
              justify-center
              bg-gray-100
              text-gray-400
            "
          >
            Sem imagem
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">

        <span
          className="
            text-sm
            font-medium
            text-violet-600
          "
        >
          {category}
        </span>

        <h3
          className="
            mt-2
            text-xl
            font-bold
            text-gray-900
            line-clamp-2
          "
        >
          {name}
        </h3>

        <p
          className="
            mt-5
            text-2xl
            font-extrabold
            text-violet-700
          "
        >
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <div
          className="
            mt-6
            w-full
            rounded-2xl
            bg-violet-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-violet-700
          "
        >
          Ver Produto
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          className="
            mt-3
            w-full
            rounded-2xl
            bg-violet-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-violet-700
          "
        >
          {added
            ? "✅ Adicionado ao carrinho"
            : "Adicionar ao carrinho"
          }
        </button>

      </div>
    </Link>
  );
}