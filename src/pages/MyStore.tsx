import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyStore() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStore = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3333/stores/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // usuário já possui loja
          navigate("/dashboard/store");
        } else {
          // usuário ainda não criou loja
          navigate("/dashboard/create-store");
        }

      } catch (error) {
        console.log("Erro ao verificar loja:", error);
        navigate("/dashboard/create-store");
      }
    };

    checkStore();

  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">
        Verificando sua loja...
      </p>
    </div>
  );
}

export default MyStore;