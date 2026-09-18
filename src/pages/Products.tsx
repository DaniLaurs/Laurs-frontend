import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
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
  images: ProductImage[];
  variants: ProductVariant[];
}

interface VariantSize {
  size: string;
  stock: number;
}

interface VariantGroup {
  color: string;
  sizes: VariantSize[];
}

export default function Products() {
  /* =======================
     STATES
  ======================= */

  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [variants, setVariants] = useState<VariantGroup[]>([
    {
      color: "",
      sizes: [
        {
          size: "",
          stock: 0,
        },
      ],
    },
  ]);
 
  const selectedCategory = PRODUCT_CATEGORIES.find(
  (cat) => cat.name === category
);
  /* =======================
     FETCH PRODUCTS
  ======================= */

async function fetchProducts(searchTerm = "") {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3333/products?search=${encodeURIComponent(searchTerm)}`,
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
     VARIANTS
  ======================= */

  function handleVariantColorChange(
    variantIndex: number,
    value: string
  ) {
    const updated = [...variants];
    updated[variantIndex].color = value;
    setVariants(updated);
  }

  function handleVariantSizeChange(
    variantIndex: number,
    sizeIndex: number,
    value: string
  ) {
    const updated = [...variants];
    updated[variantIndex].sizes[sizeIndex].size = value;
    setVariants(updated);
  }

  function handleVariantStockChange(
    variantIndex: number,
    sizeIndex: number,
    value: number
  ) {
    const updated = [...variants];
    updated[variantIndex].sizes[sizeIndex].stock = value;
    setVariants(updated);
  }

  function addColor() {
    setVariants([
      ...variants,
      {
        color: "",
        sizes: [
          {
            size: "",
            stock: 0,
          },
        ],
      },
    ]);
  }

  function removeColor(index: number) {
    setVariants(
      variants.filter((_, i) => i !== index)
    );
  }

  function addSize(variantIndex: number) {
    const updated = [...variants];

    updated[variantIndex].sizes.push({
      size: "",
      stock: 0,
    });

    setVariants(updated);
  }

  function removeSize(
    variantIndex: number,
    sizeIndex: number
  ) {
    const updated = [...variants];

    updated[variantIndex].sizes =
      updated[variantIndex].sizes.filter(
        (_, i) => i !== sizeIndex
      );

    setVariants(updated);
  }

  /* =======================
     DELETE PRODUCT
  ======================= */

  async function handleDeleteProduct(id: string) {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:3333/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  /* =======================
     CREATE PRODUCT
  ======================= */

  async function handleCreateProduct() {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);

      formData.append(
        "variants",
        JSON.stringify(variants)
      );

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(
        "http://localhost:3333/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        console.log(await response.json());
        return;
      }

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSubcategory("");
      setImages([]);

      setVariants([
        {
          color: "",
          sizes: [
            {
              size: "",
              stock: 0,
            },
          ],
        },
      ]);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <div className="min-h-screen bg-background flex">

    <main className="flex-1 p-8">

      <PageHeader
        title="Produtos"
        subtitle="Cadastre e gerencie seus produtos."
        backTo="/dashboard"
      />

      <div className="bg-surface rounded-3xl shadow-sm border border-border p-6">

        <h2 className="text-2xl font-bold mb-6">
          Novo Produto
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <Input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl p-3"
          />

          <Input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl p-3"
          />

          <Select
              value={category}
              onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory("");
                  }}
             className="border border-border rounded-xl p-3 text-text bg-surface">
            <option value="">
              Categoria
            </option>

          {PRODUCT_CATEGORIES.map((cat) => (
          <option
            key={cat.name}
            value={cat.name}
          >
            {cat.name}
          </option>
        ))}
          </Select>
            
           <Select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category}
              className="border rounded-xl p-3"
            >   
            <option value="">
                {category
                  ? "Selecione a subcategoria"
                  : "Escolha uma categoria primeiro"}
              </option>      
          

            {selectedCategory?.subcategories.map((sub) => (
              <option
                key={sub}
                value={sub}
              >
                {sub}
              </option>
            ))}
          </Select>


          <Textarea
            placeholder="Descrição"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-xl p-3 md:col-span-3"
          />

          <Input
            type="file"
            accept="image/*"
            multiple
            className="md:col-span-3"
            onChange={(e) => {
              if (!e.target.files) return;

              const files = Array.from(e.target.files);

              setImages((prev) => {
                const merged = [...prev, ...files];

                return merged.filter(
                  (file, index, self) =>
                    index ===
                    self.findIndex(
                      (f) =>
                        f.name === file.name &&
                        f.size === file.size
                    )
                );
              });
            }}
          />

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:col-span-3">

              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-28 rounded-xl object-cover border border-border"
                />
              ))}

            </div>
          )}

        </div>

        <h3 className="text-xl font-bold mt-8 mb-4">
          Variantes
        </h3>

        <div className="space-y-6">

          {variants.map((variant, variantIndex) => (

            <div
              key={variantIndex}
              className="border border-border rounded-2xl p-4 bg-surface"            >

              <div className="flex gap-3 mb-4">

                <Input
                  type="text"
                  placeholder="Cor"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantColorChange(
                      variantIndex,
                      e.target.value
                    )
                  }
                  className="border rounded-xl p-2 flex-1"
                />

                <Button
                  type="button"
                  onClick={() => removeColor(variantIndex)}
                  className="
                  bg-danger
                  text-white
                  px-4
                  rounded-xl
                  transition-all
                  hover:bg-dangerHover
                  hover:scale-105
                  active:scale-95
                  "
                                  
                >
                  Remover
                </Button>

              </div>

              {variant.sizes.map((size, sizeIndex) => (

                <div
                  key={sizeIndex}
                  className="flex gap-3 mb-3"
                >

                  <Input
                    type="text"
                    placeholder="Tamanho"
                    value={size.size}
                    onChange={(e) =>
                      handleVariantSizeChange(
                        variantIndex,
                        sizeIndex,
                        e.target.value
                      )
                    }
                    className="border rounded-xl p-2 flex-1"
                  />

                  <Input
                    type="number"
                    placeholder="Estoque"
                    value={size.stock}
                    onChange={(e) =>
                      handleVariantStockChange(
                        variantIndex,
                        sizeIndex,
                        Number(e.target.value)
                      )
                    }
                    className="border rounded-xl p-2 w-32"
                  />

                  <Button
                    type="button"
                    onClick={() =>
                      removeSize(
                        variantIndex,
                        sizeIndex
                      )
                    }
                  className="
                bg-danger
                text-white
                px-4
                rounded-xl
                transition-all
                hover:bg-dangerHover
                hover:scale-105
                active:scale-95
                "
                  >
                    X
                  </Button>

                </div>

              ))}

              <Button
                type="button"
                onClick={() => addSize(variantIndex)}
                className="bg-gradient-to-r from-primary to-primaryHover text-white px-5 py-3 rounded-2xl hover:scale-102 hover:shadow-hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]  transition-all
                  duration-300
                  ease-out
                  hover:scale-105
                  hover:shadow-primary
                  active:scale-95"
              >
                + Adicionar Tamanho
              </Button>

            </div>

          ))}

        </div>

        <div className="flex gap-4 mt-6">

          <Button
            type="button"
            onClick={addColor}
            className="bg-gradient-to-r from-primary to-primaryHover text-white px-5 py-3 rounded-2xl hover:scale-102 hover:shadow-hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]  transition-all
                  duration-300
                  ease-out
                  hover:scale-105
                  hover:shadow-primary
                  active:scale-95"
          >
            + Nova Cor
          </Button>

          <Button
            type="button"
            onClick={handleCreateProduct}
            className="bg-gradient-to-r from-primary to-primaryHover text-white px-5 py-3 rounded-2xl hover:scale-102 hover:shadow-hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]  transition-all
                  duration-300
                  ease-out
                  hover:scale-105
                  hover:shadow-primary
                  active:scale-95"
          >
            Salvar Produto
          </Button>

        </div>

      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Lista de Produtos
      </h2>

          <div className="mb-6">
      <Input
        type="text"
        placeholder="🔍 Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96"
      />
    </div>
      <div className="grid md:grid-cols-3 gap-6">
 { products.length === 0 ? (
      <div className="col-span-3 text-center text-gray-500 py-10">
      Nenhum produto encontrado.
      </div>
  ) : (
   products.map((product) => (
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
              <p className="text-textLight text-sm">
                  Nenhuma variante
                </p>
            ) : (
              product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex justify-between text-sm py-1"
                >
                  <span>
                    {variant.color} • {variant.size}
                  </span>

                  <span className="text-textLight">
                    Estoque: {variant.stock}
                  </span>
                </div>
              ))
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
              className="bg-danger  hover:bg-dangerHover text-white px-5 rounded-xl"
            >
              Excluir
            </Button>

          </div>

        </div>
      </div>
    ))
  )}
</div>

    </main>
  </div>
);
}