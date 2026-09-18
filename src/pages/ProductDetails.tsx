import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ProductGallery} from "../components/Products/ProductGallery";
import type { Product } from "../types/product";
import { ProductInfo } from "../components/Products/ProductInfo";
import PageHeader from "../components/ui/PageHeader";
import logoLaursPeq from "../assets/logo/logo-laurspeq.png";




function ProductDetails() {
  const { id } = useParams();
  console.log("ID RECEBIDO NA URL:", id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  



  useEffect(() => {
    async function fetchProduct() {
      try {

        const response = await fetch(
          `http://localhost:3333/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Produto não encontrado");
        }

        const data = await response.json();
console.log("VARIANTAS DESSE PRODUTO:", data.variants);        setProduct(data);
    


            } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setProduct(null);

      } finally {
        setLoading(false);
      }
    }


    if (id) {
      fetchProduct();
    }

  }, [id]);



  if (loading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-textLight text-lg">
        Carregando produto...
      </p>
    </div>
    );
  }



  if (!product) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-danger text-lg font-semibold">
        Produto não encontrado.
      </p>
    </div>
    );
  }

return (
  <div className="min-h-screen bg-background p-10">

    {/* Topo da página */}
    <div className="max-w-5xl mx-auto flex justify-end mb-4">
      <img
        src={logoLaursPeq}
        alt="Laurs"
        className="w-12 h-12 object-contain"
      />
    </div>


    {/* Card do produto */}
        <div
      className="
        max-w-5xl
        mx-auto
        bg-surface
        rounded-3xl
        border
        border-border
        shadow-sm
        p-10
      "
    >

      <PageHeader
        title="Detalhes do Produto"
        backTo="/dashboard/store"
      />


      <div className="grid md:grid-cols-2 gap-10">

        <ProductGallery 
          product={product}
        />

        <ProductInfo
          product={product}
        />

      </div>

    </div>

  </div>
);
}


export default ProductDetails;