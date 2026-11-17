import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"

function MyStore() {
  const navigate = useNavigate();

 
useEffect(() => {
  const checkStore = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await api.get("/stores/me");

      // Usuário já possui loja
      navigate("/dashboard/store");

    } catch (error) {
      console.log("Erro ao verificar loja:", error);

      // Usuário ainda não criou loja
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