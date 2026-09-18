import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import PageHeader from "../components/ui/PageHeader";

interface ProductImage {
  id: string;
  imageUrl: string;
}

interface Product {
  id: string;
  storeId:string;
  name: string;
  price: number;
  category?: string;
  images: ProductImage[];
}

export default function Search() {

    console.log("SEARCH PAGE CARREGOU");

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  console.log("QUERY SEARCH:", query);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function searchProducts() {

        

      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }


      try {

        const response = await fetch(
          `http://localhost:3333/products/search?search=${encodeURIComponent(query)}`
        );


        const data = await response.json();

        console.log("PRODUTOS SEARCH:", data);

        setProducts(data);


      } catch (error) {

        console.log("ERRO SEARCH:", error);
        setProducts([]);

      } finally {

        setLoading(false);

      }

    }


    searchProducts();

  }, [query]);


  if (loading) {
    return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-textLight text-lg">
        Carregando produtos...
      </p>
    </div>
    );
    
  }


  return (
  <div className="min-h-screen bg-background">
  <div className="max-w-7xl mx-auto px-6 py-10"></div>

            <PageHeader
        title="Pesquisa"
        subtitle="Encontre produtos da plataforma."
      />

      <h1 className="text-3xl font-bold text-text">
        Resultados da pesquisa
      </h1>


      <p className="mt-2 text-textLight">
        Você pesquisou por:
        <span className="font-semibold text-primary">
          {" "}{query}
        </span>
      </p>

            <p className="mt-2 text-sm text-textLight">
        {products.length} produto(s) encontrado(s)
      </p>


      {products.length === 0 ? (

        <div className="mt-12 rounded-3xl border border-border bg-surface p-10 text-center">
        <h2 className="text-xl font-bold text-text">
          Nenhum produto encontrado
        </h2>

        <p className="mt-2 text-textLight">
          Tente pesquisar outro nome ou categoria.
        </p>
      </div>

      ) : (
            <div
            className="
                grids  
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-8
                mt-8
            "
            >

            {products.map((product) => (

                <ProductCard
                key={product.id}
                id={product.id}
                storeId={product.storeId}
                name={product.name}
                price={product.price}
                category={product.category ?? ""}
                image={product.images?.[0]}
                />

            ))}

            </div>
          
      )}
    </div>
  )}
    


  