import { Link } from "react-router-dom";

interface ProductImage {
  id: string;
  imageUrl: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  images: ProductImage[];
}

interface CardStoreProps {
  product: Product;
}

function CardStore({ product }: CardStoreProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="
        group
        bg-white
        rounded-3xl
        shadow-lg
        overflow-hidden
        hover:-translate-y-2
        transition-all
        duration-300
        block
      "
    >

      {/* IMAGEM */}
      <div className="relative overflow-hidden">

        {product.images?.length > 0 ? (
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            className="
              w-full
              h-72
              object-cover
              group-hover:scale-110
              transition
              duration-500
            "
          />
        ) : (
          <div
            className="
              w-full
              h-72
              bg-gray-100
              flex
              items-center
              justify-center
              text-gray-400
            "
          >
            Sem imagem
          </div>
        )}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            to-transparent
          "
        />

      </div>


      {/* CONTEÚDO */}
      <div className="p-6">

        <span
          className="
            inline-block
            px-3
            py-1
            rounded-full
            bg-cyan-100
            text-cyan-700
            text-sm
            font-semibold
          "
        >
          Produto
        </span>


        <h3
          className="
            mt-4
            text-xl
            font-bold
            text-gray-900
            group-hover:text-cyan-600
            transition
          "
        >
          {product.name}
        </h3>


        {product.description && (
          <p
            className="
              mt-2
              text-gray-500
              line-clamp-2
            "
          >
            {product.description}
          </p>
        )}


        <div className="flex items-center justify-between mt-6">

          <p
            className="
              text-2xl
              font-extrabold
              text-cyan-600
            "
          >
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>


          <span className="text-sm text-gray-400">
            Ver →
          </span>

        </div>

      </div>

    </Link>
  );
}

export default CardStore;