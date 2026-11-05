
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import FileUpload from "../components/ui/FileUpload";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { STORE_SEGMENTS } from "../constants/storeSegments";

interface StoreData {
  name: string;
  description: string;
  segment: string;
  logo: string | null;
  banner: string | null;
}

function EditStore() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [segment, setSegment] = useState("");
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [currentBanner, setCurrentBanner] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3333/stores/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Não foi possível carregar a loja.");
        }

                const data: StoreData = await response.json();

            console.log("DADOS RECEBIDOS DA LOJA:", data);

            setName(data.name ?? "");
            setDescription(data.description ?? "");
            setSegment(data.segment ?? "");

            console.log("SEGMENTO RECEBIDO:", data.segment);

            setCurrentLogo(data.logo ?? null);
            setCurrentBanner(data.banner ?? null);
      } catch (error) {
        console.error("Erro ao carregar loja:", error);
        alert("Não foi possível carregar os dados da loja.");
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  const handleUpdateStore = async () => {
    if (!name.trim() || !description.trim() || !segment) {
      alert("Preencha o nome, a descrição e o segmento.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      let logoUrl = currentLogo;
      let bannerUrl = currentBanner;

      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }

      if (bannerFile) {
        bannerUrl = await uploadToCloudinary(bannerFile);
      }

      const response = await fetch("http://localhost:3333/stores", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          segment,
          logo: logoUrl,
          banner: bannerUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao atualizar loja.");
        return;
      }

      alert("Loja atualizada com sucesso!");
      navigate("/dashboard/store");
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
      alert("Não foi possível atualizar a loja.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10">Carregando dados da loja...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Editar Loja"
          subtitle="Atualize as informações da sua loja."
          backTo="/dashboard/store"
        />

        <div className="mt-6 space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <Input
            label="Nome da Loja"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da loja"
          />

          <Textarea
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva sua loja"
          />

        
<Select
        label="Segmento da Loja"
        value={segment}
        onChange={(e) => {
            console.log("VALOR SELECIONADO:", e.target.value);
            setSegment(e.target.value);
        }}
        >
        <option value="">Selecione um segmento</option>

        {STORE_SEGMENTS.map((item) => (
            <option key={item.id} value={item.id}>
            {item.label}
            </option>
        ))}
        </Select>

    <p>Valor atual do segmento: {segment || "(vazio)"}</p>


          <div>
            <p className="mb-2 font-medium">Logo atual</p>
            {currentLogo ? (
              <img
                src={currentLogo}
                alt="Logo atual da loja"
                className="mb-4 h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <p className="mb-4 text-sm text-gray-500">
                Nenhuma logo cadastrada.
              </p>
            )}

            <FileUpload
              label="Nova logo (opcional)"
              file={logoFile}
              onChange={setLogoFile}
            />
          </div>

          <div>
            <p className="mb-2 font-medium">Banner atual</p>
            {currentBanner ? (
              <img
                src={currentBanner}
                alt="Banner atual da loja"
                className="mb-4 h-40 w-full rounded-xl object-cover"
              />
            ) : (
              <p className="mb-4 text-sm text-gray-500">
                Nenhum banner cadastrado.
              </p>
            )}

            <FileUpload
              label="Novo banner (opcional)"
              file={bannerFile}
              onChange={setBannerFile}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleUpdateStore} disabled={saving}>
              {saving ? "Salvando..." : "Salvar Alterações"}
            </Button>

            <Button
              onClick={() => navigate("/dashboard/store")}
              disabled={saving}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStore;
