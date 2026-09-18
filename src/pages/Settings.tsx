import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { STORE_SEGMENTS } from "../constants/storeSegments";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import FileUpload from "../components/ui/FileUpload";


function Settings() {
  const [loading, setLoading] = useState(true);
  const [hasStore, setHasStore] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const [segment, setSegment] = useState("");

  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

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
          setHasStore(false);
          setLoading(false);
          return;
        }

        const data = await response.json();

        console.log("Resposta do backend:", data);

        if (!data || !data.slug) {
          setHasStore(false);
        } else {
          setHasStore(true);

          setName(data.name || "");
          setDescription(data.description || "");
          setSlug(data.slug || "");
          setSegment(data.segment || "");

          setLogo(data.logo || "");
          setBanner(data.banner || "");
        }

      } catch (error) {
        console.log(error);
        setHasStore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  const handleSave = async () => {
    try {

      
      


      const token = localStorage.getItem("token");

      let logoUrl = logo;
      let bannerUrl = banner;

 

      // ☁️ upload logo se mudou
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
        console.log("Nova Logo URL:", logoUrl);
      }

      // ☁️ upload banner se mudou
      if (bannerFile) {
        bannerUrl = await uploadToCloudinary(bannerFile);
          console.log("Novo Banner URL:", bannerUrl);
      }
      

      const response = await fetch("http://localhost:3333/stores", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          segment,
          logo: logoUrl,
          banner: bannerUrl,
        }),
      });

      if (!response.ok) {
        alert("Erro ao atualizar loja");
        return;
      }

      alert("Loja atualizada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

 if (loading) {
  return (
    <div className="min-h-screen bg-background p-10 text-textLight">
      Carregando...
    </div>
  );
}

  if (!hasStore) {
    return <Navigate to="/create-store" replace />;
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex">

      {/* Glow superior */}
    <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-primary/20 blur-[140px] rounded-full" />

      {/* Glow inferior */}
    <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-secondary/40 blur-[140px] rounded-full" />

      {/* Glow central */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10  blur-[120px] rounded-full" />
    <div className="relative z-10">
  
</div>

      <main className="relative z-10 flex-1 p-8">
      <PageHeader
          title="Configurações"
          subtitle="Gerencie as informações da sua loja."
          backTo="/dashboard"
        />

        <div
        className="
          bg-surface
          border
          border-border
          rounded-3xl
          shadow-sm
          p-8
          max-w-2xl
        "
      >

     <Input
        label="Nome da Loja"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome da loja"
      />

       <Textarea
           label="Descrição"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           placeholder="Conte um pouco sobre sua loja"
          />
            <Select
      label="Segmento da Loja"
      value={segment}
      onChange={(e) => setSegment(e.target.value)}
    >
      {STORE_SEGMENTS.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.label}
        </option>
      ))}
    </Select>
         
        <FileUpload
            label="Logo da Loja"
            file={logoFile}
            preview={logo}
            onChange={setLogoFile}
          />

        <FileUpload
          label="Banner da Loja"
          file={bannerFile}
          preview={banner}
          onChange={setBannerFile}
        />

          {/* SALVAR */}
         <Button onClick={handleSave}>
          Salvar Alterações
        </Button>

          {slug && (
            <Link
              to={`/store/${slug}`}
             className="
                ml-4
                text-primary
                hover:text-primaryHover
                transition
              "
            >
              Ver loja
            </Link>
          )}

        </div>
      </main>
    </div>
  );
}

export default Settings;