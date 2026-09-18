import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { STORE_SEGMENTS } from "../constants/storeSegments";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import { styled } from "styled-components";
import PageBackground from "../components/Layout/PageBackground";
import CreateStore1 from"../assets/CreateStore1.png";
import FileUpload from "../components/ui/FileUpload";

function CreateStore() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [segment, setSegment] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const navigate = useNavigate();

const handleCreateStore = async () => {
  try {
    const token = localStorage.getItem("token");

    let logoUrl = null;
    let bannerUrl = null;

    // 🔥 aqui está a mudança importante
    if (logoFile) {
      logoUrl = await uploadToCloudinary(logoFile);
    }

    if (bannerFile) {
      bannerUrl = await uploadToCloudinary(bannerFile);
    }

    console.log("Logo File:", logoFile);
console.log("Banner File:", bannerFile);

console.log("Logo URL:", logoUrl);
console.log("Banner URL:", bannerUrl);

    const response = await fetch("http://localhost:3333/stores", {
      method: "POST",
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

    const data = await response.json();

    console.log(data);

    alert("Loja criada com sucesso!");

    navigate(`/store/${data.slug}`);
  } catch (error) {
    console.log(error);
  }
};


return (

    <PageBackground>
  <Page $bg={CreateStore1}>

       <BackgroundCircleOne />
    <BackgroundCircleTwo />

    <Content>

    <PageHeader
      title="Criar Loja"
      subtitle="Configure sua loja e comece a vender online."
      backTo="/dashboard"
    />

    <Card>

      <Input
        label="Nome da Loja"
        placeholder="Digite o nome da sua loja"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Textarea
        label="Descrição"
        placeholder="Digite uma descrição para sua loja"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

      {/* LOGO */}
   {/* LOGO */}
      <div className="mb-6 mt-6">

        <FileUpload
          label="Logo da Loja"
          file={logoFile}
          onChange={setLogoFile}
        />

      </div>

  


        {/* BANNER */}
        <div className="mb-6">

          <FileUpload
            label="Banner da Loja"
            file={bannerFile}
            onChange={setBannerFile}
          />

        </div>


        <Button onClick={handleCreateStore}>
          Criar Loja
        </Button>


    </Card>

    </Content>

  </Page>
  </PageBackground>
)
}


const Page = styled.div<{ $bg: string }>`
  min-height: 100vh;
  padding: 32px;

  position: relative;
  overflow: hidden;

  background-image: 
    linear-gradient(
      rgba(248,250,252,0.85),
      rgba(248,250,252,0.85)
    ),
    url(${({ $bg }) => $bg});

  background-size: cover;
  background-position: center;
`;


const Card = styled.div`
  max-width: 700px;
  margin-top: 24px;

  background: ${({ theme }) => theme.colors.surface};

  border-radius: 24px;

  padding: 40px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  box-shadow: 0 10px 30px rgba(0,0,0,0.05);

  animation: show .3s ease;


  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;


const BackgroundCircleOne = styled.div`
  position: absolute;

  width: 450px;
  height: 450px;

  border-radius: 50%;

background: linear-gradient(
  135deg,
  ${({ theme }) => theme.colors.primary},
  #60A5FA
);

  opacity: 0.15;

  top: -150px;
  right: -120px;

  filter: blur(20px);
`;


const BackgroundCircleTwo = styled.div`
  position: absolute;

  width: 350px;
  height: 350px;

  border-radius: 50%;

background: linear-gradient(
  135deg,
  #38BDF8,
  ${({ theme }) => theme.colors.primary}
);

  opacity: 0.12;

  bottom: -100px;
  left: -100px;

  filter: blur(25px);
`;

export default CreateStore;