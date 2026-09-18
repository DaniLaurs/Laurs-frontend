import type { Product, ProductVariant  } from "../../types/product";
import { useCart } from "../../context/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface ProductInfoProps {
  product: Product;
}


export function ProductInfo({ product }: ProductInfoProps) {

     const { addToCart } = useCart();

     const navigate = useNavigate();


     const [quantity, setQuantity] = useState(1);

     const [selectedVariant, setSelectedVariant] =
  useState<ProductVariant | null>(null);




     function handleAddToCart() {

if ((product.variants?.length ?? 0) > 0 && !selectedVariant) {
    alert("Selecione uma variação");

    return;
  }



  const item = ({
    id: product.id,
    storeId: product.storeId,
    name: product.name,
    price: product.price,
    image: product.images[0]?.imageUrl || "",
    quantity,
    

  variant: selectedVariant
    ? {
        id: selectedVariant.id,
        color: selectedVariant.color,
        size: selectedVariant.size
      }
    : undefined

    
  });


      console.log("ITEM ENVIADO:", item);

    addToCart(item);

     



}

console.log("VARIANTAS NO PRODUCT INFO:", product.variants);


  return (
    <div>

      <h1 className="text-4xl font-bold text-text">
        {product.name}
      </h1>


      <p className="text-textLight mt-5">
        {product.description}
      </p>


      <p className="text-primary text-3xl font-bold mt-6">
        {product.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
      </p>


      <p className="mt-4 text-textLight">
        Estoque disponível: {product.stock}
      </p>

      {(product.variants?.length ?? 0) > 0 &&  (
  <div className="mt-6">

    <p className="font-semibold mb-2">
      Variação:
    </p>


        <div className="flex gap-3">

    {product.variants?.map((variant) => (
  <button
    key={variant.id}
    onClick={() => setSelectedVariant(variant)}
    className={`
      px-5
      py-3
      rounded-xl
      border
      transition-all
      duration-200
      ${
        selectedVariant?.id === variant.id
          ? "bg-primary text-white border-primary shadow-lg"
          : "bg-surface border-border hover:border-primary hover:bg-secondary"
      }
    `}
  >
    {variant.color} / {variant.size}
  </button>
))}
        

        </div>


      </div>
    )}

          {selectedVariant && (
        <p className="mt-3 text-textLight">
          Estoque disponível:
          {" "}
          {selectedVariant.stock}
        </p>
      )}

      <div className="mt-6">

        <p className="font-semibold mb-2">
          Quantidade
        </p>

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setQuantity((q) => Math.max(1, q - 1))
          }
          className="
            bg-secondary
            hover:bg-secondaryHover
            text-primary
            transition-all
            rounded-xl
            font-bold
          "
        >
          -
        </button>


        <span className="text-xl font-bold">
          {quantity}
        </span>


        <button
          onClick={() =>
            setQuantity((q) => q + 1)
          }
          className="
              bg-secondary
              hover:bg-secondaryHover
              text-primary
              transition-all
              rounded-xl
              font-bold
                        "
        >
          +
        </button>

      </div>

    </div>

    <button
      onClick={handleAddToCart}
    className="
        mt-8
        w-full
        bg-gradient-to-r
        from-primary
        to-primaryHover
        text-white
        py-4
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-primary
        active:scale-95
        "
    >
      Adicionar ao carrinho
    </button>

      <button
        onClick={() => navigate("/cart")}
        className="
            mt-4
            w-full
            bg-secondary
            text-primary
            border
            border-border
            py-4
            rounded-2xl
            font-semibold
            transition-all
            hover:bg-secondaryHover
            hover:border-primary
            "
      >
        Ver carrinho
      </button>


    </div>
  );
}