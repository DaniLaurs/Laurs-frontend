import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import api from "../services/api";
import axios from "axios";

interface VariantSize {
  size: string;
  stock: number;
}

interface VariantGroup {
  color: string;
  sizes: VariantSize[];
}

function CreateProduct() {
  const navigate = useNavigate();

    const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
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

    const handleVariantColorChange = (
    colorIndex: number,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === colorIndex
          ? { ...variant, color: value }
          : variant
      )
    );
  };

  const handleVariantSizeChange = (
    colorIndex: number,
    sizeIndex: number,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              sizes: variant.sizes.map((size, index) =>
                index === sizeIndex
                  ? { ...size, size: value }
                  : size
              ),
            }
          : variant
      )
    );
  };

  const handleVariantStockChange = (
    colorIndex: number,
    sizeIndex: number,
    value: number
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              sizes: variant.sizes.map((size, index) =>
                index === sizeIndex
                  ? { ...size, stock: value }
                  : size
              ),
            }
          : variant
      )
    );
  };

  const addColor = () => {
    setVariants((prev) => [
      ...prev,
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
  };

  const removeColor = (colorIndex: number) => {
    setVariants((prev) =>
      prev.filter((_, index) => index !== colorIndex)
    );
  };

  const addSize = (colorIndex: number) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              sizes: [
                ...variant.sizes,
                {
                  size: "",
                  stock: 0,
                },
              ],
            }
          : variant
      )
    );
  };

  const removeSize = (
    colorIndex: number,
    sizeIndex: number
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              sizes: variant.sizes.filter(
                (_, index) => index !== sizeIndex
              ),
            }
          : variant
      )
    );
  };

    
const handleCreateProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    formData.append(
      "variants",
      JSON.stringify(variants)
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await api.post("/products", formData);

    const data = response.data;

    alert(data.message || "Produto criado com sucesso!");

    navigate("/dashboard/products");

  } catch (error) {
    console.error("ERRO AO CRIAR PRODUTO:", error);

    if (axios.isAxiosError(error)) {
      alert(
        error.response?.data?.error ||
        "Erro ao criar produto."
      );
    } else {
      alert("Erro ao criar produto.");
    }
  }
};


  return (
    <div>
      <PageHeader
        title="Novo Produto"
        subtitle="Cadastre um novo produto na sua loja."
        backTo="/dashboard/products"
      />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Informações do Produto
          </h2>

          <Input
            label="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do produto"
          />

          <Textarea
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição do produto"
          />

          <Input
            label="Preço"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0,00"
          />

          
          <Input
            label="Estoque disponível (produto sem variantes)"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
          />


         <Select
            label="Categoria"
            value={category}
            onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
            }}
            >
            <option value="">Selecione uma categoria</option>

            {PRODUCT_CATEGORIES.map((item) => (
                <option
                key={item.name}
                value={item.name}
                >
                {item.name}
                </option>
            ))}
            </Select>
         
         {category && (
            <Select
                label="Subcategoria"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
            >
                <option value="">
                Selecione uma subcategoria
                </option>

                {(
                PRODUCT_CATEGORIES.find(
                    (item) => item.name === category
                )?.subcategories ?? []
                ).map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
                ))}
            </Select>
            )}


          {/* IMAGENS */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Imagens do produto
            </label>
              
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
              if (!e.target.files) return;

              const files = Array.from(e.target.files);

              setImages((prev) => [...prev, ...files]);

              e.target.value = "";
            }}
                          className="w-full border rounded-xl p-3"
            />
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={`${image.name}-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl border"
                    />

                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          {/* VARIANTES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Variantes
              </h3>

              <Button
                type="button"
                onClick={addColor}
              >
                + Adicionar cor
              </Button>
            </div>

            {variants.map((variant, colorIndex) => (
              <div
                key={colorIndex}
                className="border rounded-xl p-4 space-y-4"
              >
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Input
                      label="Cor"
                      value={variant.color}
                      onChange={(e) =>
                        handleVariantColorChange(
                          colorIndex,
                          e.target.value
                        )
                      }
                      placeholder="Ex: Azul"
                    />
                  </div>

                  {variants.length > 1 && (
                    <Button
                      type="button"
                      onClick={() =>
                        removeColor(colorIndex)
                      }
                    >
                      Remover
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {variant.sizes.map(
                    (size, sizeIndex) => (
                      <div
                        key={sizeIndex}
                        className="flex gap-3 items-end"
                      >
                        <div className="flex-1">
                          <Input
                            label="Tamanho"
                            value={size.size}
                            onChange={(e) =>
                              handleVariantSizeChange(
                                colorIndex,
                                sizeIndex,
                                e.target.value
                              )
                            }
                            placeholder="Ex: M"
                          />
                        </div>

                        <div className="flex-1">
                          <Input
                            label="Estoque"
                            type="number"
                            value={size.stock}
                            onChange={(e) =>
                              handleVariantStockChange(
                                colorIndex,
                                sizeIndex,
                                Number(e.target.value)
                              )
                            }
                            min="0"
                          />
                        </div>

                        {variant.sizes.length > 1 && (
                          <Button
                            type="button"
                            onClick={() =>
                              removeSize(
                                colorIndex,
                                sizeIndex
                              )
                            }
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    )
                  )}

                  <Button
                    type="button"
                    onClick={() => addSize(colorIndex)}
                  >
                    + Adicionar tamanho
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CADASTRAR */}
          <div className="flex justify-end pt-4">
            <Button
              type="button"
              onClick={handleCreateProduct}
            >
              Cadastrar Produto
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );

}

  export default CreateProduct;