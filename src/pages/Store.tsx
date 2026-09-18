import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import PageHeader from "../components/ui/PageHeader";
import logoLaurs from "../assets/logo/logo-laurs.png";

interface ProductImage {
  id: string;
  imageUrl: string;
  productId: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  stock: number;
  images: ProductImage[];
}


interface StoreData {
  id: string;
  name: string;
  description: string;
  slug: string;
  segment?: string;
  logo: string | null;
  banner: string | null;
  products: Product[];
}

function Store() {
  const { slug } = useParams();

  const isDashboard = window.location.pathname === "/dashboard/store";

  const [store, setStore] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);

        let url = "";

        if (isDashboard) {
          url = "http://localhost:3333/stores/me";
        } else {
          url = `http://localhost:3333/stores/${slug}`;
        }

        const response = await fetch(url, {
          headers: isDashboard
            ? {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            : {},
        });

        if (!response.ok) {
          throw new Error("Store not found");
        }

        const data = await response.json();

        console.table(data.products);

        setStore(data);

        console.log("Produtos:", data.products);
        console.log("Primeira imagem:", data.products[0]?.images);
        console.log("Objeto da primeira imagem:", data.products[0]?.images?.[0]);
      } catch (error) {
        console.log("Erro ao buscar loja:", error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    if (isDashboard || slug) {
      fetchStore();
    }
  }, [slug, isDashboard]);

  const storeUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      alert("Link copiado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };


  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="p-10 text-gray-600">
        Carregando loja...
      </div>
    );
  }


  // 🔥 STORE NÃO ENCONTRADA
  if (!store) {
    return (
      <div>
        <h2>Você ainda não possui uma loja</h2>

        <Link to="/dashboard/create-store">
          Criar minha loja
        </Link>
      </div>
    )
  }

  console.log("🧠 STORE NO STATE:", store);
  console.log("🖼️ LOGO:", store?.logo);
  console.log("🖼️ BANNER:", store?.banner);

  return (
    <div className="relative min-h-screen bg-[#f5f7ff] overflow-hidden p-10">
    

  <div className="relative z-10 flex items-center justify-between mb-8">

  <PageHeader
    title="Loja"
    backTo="/dashboard"
  />

  <img
    src={logoLaurs}
    alt="Laurs"
    className="w-32 object-contain"
  />

</div>

     
      {/* Glow superior esquerdo */}
      <div className="
              absolute
              -top-40
              -left-40
              w-[500px]
              h-[500px]
              bg-cyan-400/20
              blur-[150px]
              rounded-full
            " />

      {/* Glow inferior direito */}
      <div className="
              absolute
              -bottom-40
              -right-40
              w-[500px]
              h-[500px]
              bg-violet-500/20
              blur-[150px]
              rounded-full
            " />


      {/* Conteúdo */}
      <div className="relative z-10 max-w-6xl mx-auto">
   


        {/* BANNER */}
        {store.banner?.trim() && (
          <div className="mb-8 relative">

            <img
              src={store.banner}
              alt={store.name}
              className="
                w-full
                h-80
                object-cover
                rounded-3xl
                shadow-2xl
              "
            />

            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-gradient-to-t
                from-black/40
                via-black/10
                to-transparent
              "
            />

          </div>



        )}

      



      {/* LOGO */}
      {store.logo?.trim() && (
        <div className="
              flex
              justify-center
              -mt-10
              mb-10
              relative
              z-10
            ">

          <div
            className="
                  w-40
                  h-40
                  rounded-full
                  bg-white
                  p-2
                  shadow-2xl
                  hover:scale-102
                  transition
                "
          >

            <img
              src={store.logo}
              alt={store.name}
              className="
                    w-full
                    h-full
                    rounded-full
                    object-cover
                  "
            />

          </div>

        </div>
      )}

      {/* INFO LOJA */}
      <div className="text-center -mt-8 mb-12">

        <h1 className="text-5xl font-extrabold text-gray-900">
          {store.name}
        </h1>

        {store.segment && (
          <span className="inline-block mt-4 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold">
            {store.segment}
          </span>
        )}

        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
          {store.description}
        </p>


        {/* AÇÕES */}
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={handleCopyLink}
            className="
              px-6
              py-3
              rounded-xl
              bg-cyan-500
              text-white
              font-semibold
              hover:bg-cyan-600
              transition
            "
          >
            📋 Copiar Link
          </button>


          <a
            href="#produtos"
            className="
              px-6
              py-3
              rounded-xl
              border
              border-cyan-500
              text-cyan-600
              font-semibold
              hover:bg-cyan-50
              transition
            "
          >
            Ver Produtos
          </a>

        </div>

      </div>
{/* PRODUTOS */}
{store.products.length === 0 ? (

  <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-gray-500">
    Nenhum produto cadastrado ainda.
  </div>

) : (

  <div
    id="produtos"
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-8
      mt-10
    "
  >
    {store.products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        storeId={store.id}
        name={product.name}
        price={product.price}
        category={product.category}
        image={product.images?.[0]}
      />
    ))}
  </div>

)}

      </div>
    </div>
  );
}

export default Store;