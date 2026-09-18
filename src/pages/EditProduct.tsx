/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button"

interface VariantGroup {
  color: string;
  stockBySize: Record<string, number>;
}

const SIZES = ["PP", "P", "M", "G", "GG", "XG", "XXG", "3G", "4G", "5G", "6G"];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [variants, setVariants] = useState<VariantGroup[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  // =======================
  // LOAD PRODUCT
  // =======================
  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await api.get(`/products/${id}`);

      setName(data.name);
      setDescription(data.description || "");
      setPrice(String(data.price || 0));
      setCategory(data.category || "");
      setSubcategory(data.subcategory || "");

      setExistingImages(data.images || []);

      const mapped = (data.variants || []).map((v: any) => ({
        color: v.color,
        stockBySize: Object.fromEntries(
          SIZES.map((s) => {
            const sizeData = v.sizes?.find((x: any) => x.size === s);
            return [s, sizeData ? sizeData.stock : 0];
          })
        ),
      }));

      setVariants(mapped);
    };

    if (id) loadProduct();
  }, [id]);

  // =======================
  // VARIANTS
  // =======================
  const addColor = () => {
    setVariants((prev) => [
      ...prev,
      {
        color: "",
        stockBySize: Object.fromEntries(SIZES.map((s) => [s, 0])) as Record<string, number>,
      },
    ]);
  };

  const removeColor = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, value: string) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, color: value } : v))
    );
  };

  const updateStock = (index: number, size: string, value: number) => {
    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== index) return v;

        return {
          ...v,
          stockBySize: {
            ...v.stockBySize,
            [size]: value,
          },
        };
      })
    );
  };

  // =======================
  // SAVE
  // =======================
  const handleSave = async () => {
       const token = localStorage.getItem("token");

       console.log("TOKEN:", token);

    const formattedVariants = variants.map((v) => ({
      color: v.color,
      sizes: Object.entries(v.stockBySize).map(([size, stock]) => ({
        size,
        stock: Number(stock),
      })),
    }));



    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("variants", JSON.stringify(formattedVariants));

    newImages.forEach((img) => {
      formData.append("images", img);
    });

    formData.append("removedImages", JSON.stringify(removedImages));

    await api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    
  await api.put(`/products/${id}`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});
    navigate("/dashboard/products");
  };

  // =======================
  // UI
  // =======================
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <PageHeader
          title="Editar Produto"
          subtitle="Atualize as informações do produto."
          backTo="/dashboard/products"
        />
        {/* INFO */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <input
            className="w-full p-2 border rounded-lg mb-3"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-2 border rounded-lg mb-3"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded-lg mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Categoria</option>
            <option value="bones">Bonés</option>
            <option value="roupas">Roupas</option>
            <option value="celulares">Celulares</option>
            <option value="pc">PC</option>
            <option value="fone">Fone de Ouvido</option>
          </select>

          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* IMAGES */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="font-semibold mb-3">Imagens</h2>

          {/* EXISTENTES */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={img.imageUrl}
                  className="h-28 w-full object-cover rounded-lg"
                />

                <button
                  onClick={() =>
                    setRemovedImages((prev) => [...prev, img.id])
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* NOVAS */}
          <input
            type="file"
            multiple
            onChange={(e) =>
              setNewImages(Array.from(e.target.files || []))
            }
          />

          <div className="grid grid-cols-3 gap-3 mt-3">
            {newImages.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="h-28 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* VARIANTS */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Variações</h2>

            <button
              onClick={addColor}
              className="bg-cyan-500 text-white px-4 py-2 rounded-xl"
            >
              + Cor
            </button>
          </div>

          {variants.map((v, i) => (
            <div key={i} className="border p-4 rounded-lg mb-4">
              <input
                className="w-full p-2 border rounded-lg mb-3"
                placeholder="Cor"
                value={v.color}
                onChange={(e) => updateColor(i, e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                {SIZES.map((size) => (
                  <div key={size} className="flex justify-between">
                    <span>{size}</span>

                    <input
                      type="number"
                      className="w-16 border p-1"
                      value={v.stockBySize[size] ?? 0}
                      onChange={(e) =>
                        updateStock(i, size, Number(e.target.value))
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => removeColor(i)}
                className="mt-3 text-red-500"
              >
                Remover cor
              </button>
            </div>
          ))}
        </div>

       <Button onClick={handleSave}>
           Salvar Produto
      </Button>

            </div>
    </div>
  );
}