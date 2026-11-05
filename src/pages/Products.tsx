
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

/* =======================
   TYPES
======================= */

interface ProductImage {
  id: string;
  imageUrl: string;
}

interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock: number;
  storeId: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export default function Products() {
  /* =======================
     STATES
  ======================= */

  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const [addedProducts, setAddedProducts] = useState<
    Record<string, boolean>
  >({});

  /* =======================
     FETCH PRODUCTS
  ======================= */

  async function fetchProducts(searchTerm = "") {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3333/products?search=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  /* =======================
     ADD TO CART
  ======================= */

  
function handleAddToCart(product: Product) {
  const selectedVariantId = selectedVariants[product.id];

  const variant = product.variants.find(
    (item) => item.id === selectedVariantId
  );

  const cartKey = `${product.id}-${selectedVariantId || "default"}`;

  if (product.variants.length > 0 && !variant) {
    alert("Selecione uma variante antes de adicionar ao carrinho.");
    return;
  }

  addToCart({
    id: product.id,
    storeId: product.storeId,
    name: product.name,
    price: product.price,
    image: product.images[0]?.imageUrl ?? "",
    quantity: 1,
    stock: product.stock,
    variant: variant
  ? {
      id: variant.id,
      color: variant.color,
      size: variant.size,
      stock: variant.stock,
    }
  : undefined,
  });

  setAddedProducts((current) => ({
    ...current,
    [cartKey]: true,
  }));

  setTimeout(() => {
    setAddedProducts((current) => ({
      ...current,
      [cartKey]: false,
    }));
  }, 2000);
}


  /* =======================
     DELETE PRODUCT
  ======================= */

  async function handleDeleteProduct(id: string) {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3333/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  /* =======================
     RETURN
  ======================= */

  return (
    <div className="min-h-screen bg-background flex">
      <main className="flex-1 p-8">
        <PageHeader
          title="Produtos"
          subtitle="Gerencie seus produtos."
          backTo="/dashboard"
        />

        {/* BUSCA */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="🔍 Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96"
          />
        </div>

        {/* LISTA DE PRODUTOS */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-10">
              Nenhum produto encontrado.
            </div>
          ) : (
            products.map((product) => {
              const selectedVariantId = selectedVariants[product.id];

              const cartKey = `${product.id}-${
                selectedVariantId || "default"
              }`;

              return (
                <div
                  key={product.id}
                  className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden"
                >
                  {/* IMAGEM */}
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="w-full h-52 bg-secondary flex items-center justify-center text-textLight">
                      Sem imagem
                    </div>
                  )}

                  {/* CONTEÚDO */}
                  <div className="p-4">
                    <h3 className="text-xl font-bold">
                      {product.name}
                    </h3>

                    <p className="text-sm text-textLight mt-1">
                      {product.category}
                    </p>

                    <p className="text-2xl font-bold text-primary mt-3">
                      {Number(product.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    {product.description && (
                      <p className="text-textLight mt-3 line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    {/* VARIANTES */}
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="font-semibold mb-2 text-text">
                        Variantes
                      </p>

                      {product.variants.length === 0 ? (
                        <p className="text-sm text-textLight">
                          Nenhuma variante
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {product.variants.map((variant) => (
                            <button
                              key={variant.id}
                              type="button"
                              disabled={variant.stock <= 0}
                              onClick={() =>
                                setSelectedVariants((current) => ({
                                  ...current,
                                  [product.id]: variant.id,
                                }))
                              }
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-sm transition ${
                                selectedVariants[product.id] ===
                                variant.id
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-surface text-text"
                              } ${
                                variant.stock <= 0
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:border-primary"
                              }`}
                            >
                              <span>
                                {variant.color || "Sem cor"}
                                {variant.size &&
                                  ` • ${variant.size}`}
                              </span>

                              <span>
                                Estoque: {variant.stock}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* BOTÕES */}
                    <div className="flex gap-3 mt-6">
                      <Link
                        to={`/dashboard/products/edit/${product.id}`}
                        className="
                          flex-1
                          bg-gradient-to-r
                          from-primary
                          to-primaryHover
                          text-white
                          text-center
                          py-3
                          rounded-xl
                          transition-all
                          hover:scale-105
                          hover:shadow-primary
                        "
                      >
                        Editar
                      </Link>

                      <Button
                        onClick={() =>
                          handleDeleteProduct(product.id)
                        }
                        className="bg-danger hover:bg-dangerHover text-white px-5 rounded-xl"
                      >
                        Excluir
                      </Button>
                    </div>
              {/* ADICIONAR AO CARRINHO */}
               <Button
              onClick={() => handleAddToCart(product)} disabled={!!addedProducts[cartKey]}
              className={`w-full mt-2 ${ addedProducts[cartKey] ? 
                "!bg-green-500 !hover:bg-green-500 cursor-default" : "" }`} >
                  {addedProducts[cartKey] ? "✓ Adicionado ao carrinho" :
                    "Adicionar ao carrinho"} </Button> 
                    </div>
                    </div> ); 
                    })
                    )} 
                    </div>
                      </main> 
                      </div> 
                      );
                      }

