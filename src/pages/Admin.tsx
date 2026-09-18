import { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import AdminGrowthChart from "../components/Charts/AdminGrowthChart";
import AdminProductsChart from "../components/Charts/AdminProductsChart";
import AdminSalesChart from "../components/Charts/AdminSalesChart";
import AdminMetricCard from "../components/Charts/AdminMetricCard";
import Skeleton from "../components/ui/Skeleton";

import {
  Users,
  Store,
  Package,
} from "lucide-react";

interface Stats {
  users: number;
  stores: number;
  products: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface GrowthData {
  date: string;
  users: number;
  stores: number;
  products: number;
}

function Admin() {

  const [open, setOpen] = useState(false);

  const [stats, setStats] = useState<Stats>({
    users: 0,
    stores: 0,
    products: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [growth, setGrowth] = useState<GrowthData[]>([]);

  const [period, setPeriod] = useState("30");

  const [indicators, setIndicators] = useState({
  users: 0,
  stores: 0,
  products: 0,
});

const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
`http://localhost:3333/admin/dashboard?period=${period}`,        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     const data = await response.json();

      console.log("ADMIN DASHBOARD:", data);

      if (!response.ok) {
  console.error(data);
  return;
}

      setStats(data.stats);

     setGrowth(data.growth);

     setIndicators(data.indicators);

       // BUSCAR USUÁRIOS
    const usersResponse = await fetch(
      "http://localhost:3333/admin/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const usersData = await usersResponse.json();
console.log("USUÁRIOS RECEBIDOS:", usersData);

    setUsers(usersData);

    setLoading(false);
  };


    

    fetchStats();


    
  }, [period]);

  const makeAdmin = async (id: string) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:3333/admin/users/${id}/make-admin`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  window.location.reload();
};

const removeAdmin = async (id: string) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:3333/admin/users/${id}/remove-admin`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  window.location.reload();
};

const deleteUser = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!confirm("Excluir usuário?")) {
    return;
  }

  await fetch(
    `http://localhost:3333/admin/users/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  window.location.reload();
};





const growthChartData = growth ?? [];

const productsChartData = (growth ?? []).map((item) => ({
  date: item.date,
  products: item.products,
}));

return (
  <div className="min-h-screen bg-background flex">
    <Sidebar
      open={open}
      setOpen={setOpen}
    />

    <main className="flex-1 p-8">

      <PageHeader
        title="Painel Administrativo"
        subtitle="Gerencie usuários, lojas e produtos da plataforma."
        backTo="/dashboard"
      />

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {loading ? (
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </>
        ) : (
          <>
            <AdminMetricCard
              title="Usuários"
              value={stats.users}
              growth={indicators.users}
              icon={<Users size={28} />}
              delay={0.1}
            />

            <AdminMetricCard
              title="Lojas"
              value={stats.stores}
              growth={indicators.stores}
              icon={<Store size={28} />}
              delay={0.2}
            />

            <AdminMetricCard
              title="Produtos"
              value={stats.products}
              growth={indicators.products}
              icon={<Package size={28} />}
              delay={0.3}
            />
          </>
        )}

      </div>


      {/* GRÁFICOS */}
      <div
        className="
          grid
          grid-cols-1
          gap-8
          mt-8
        "
      >

        <div className="flex justify-end gap-3 mb-6">

          <button
            onClick={() => setPeriod("7")}
            className={`
              px-4 py-2 rounded-xl transition
              ${
                period === "7"
                  ? "bg-primary text-white"
                  : "bg-surface border border-border hover:bg-secondary"
              }
            `}
          >
            7 dias
          </button>


          <button
            onClick={() => setPeriod("30")}
            className={`
              px-4 py-2 rounded-xl transition
              ${
                period === "30"
                  ? "bg-primary text-white"
                  : "bg-surface border border-border hover:bg-secondary"
              }
            `}
          >
            30 dias
          </button>


          <button
            onClick={() => setPeriod("month")}
            className={`
              px-4 py-2 rounded-xl transition
              ${
                period === "month"
                  ? "bg-primary text-white"
                  : "bg-surface border border-border hover:bg-secondary"
              }
            `}
          >
            Mês atual
          </button>

        </div>


        <AdminGrowthChart
          data={growthChartData}
        />

        <AdminProductsChart
          data={productsChartData}
        />

        <AdminSalesChart />

      </div>



      {/* USUÁRIOS */}
      <div
        className="
          bg-surface
          border
          border-border
          rounded-3xl
          shadow-sm
          mt-10
          p-6
        "
      >

        <h2 className="text-2xl font-bold mb-6">
          Usuários cadastrados
        </h2>


        <table className="w-full">

          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3">
                Nome
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-left p-3">
                Role
              </th>

              <th className="text-left p-3">
                Ações
              </th>
            </tr>
          </thead>


          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="
                  border-b
                  border-border
                  hover:bg-secondary
                  transition
                "
              >

                <td className="p-3">
                  {user.name}
                </td>


                <td className="p-3">
                  {user.email}
                </td>


                <td className="p-3">
                  {user.role === "ADMIN"
                    ? "👑 ADMIN"
                    : "👤 USER"}
                </td>


                <td className="p-3 flex gap-2">

                  {user.role === "USER" ? (

                    <button
                      onClick={() => makeAdmin(user.id)}
                      className="
                        bg-success
                        hover:bg-successHover
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "
                    >
                      Tornar Admin
                    </button>

                  ) : (

                    <button
                      onClick={() => removeAdmin(user.id)}
                      className="
                        bg-warning
                        hover:bg-warningHover
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "
                    >
                      Remover Admin
                    </button>

                  )}


                  <button
                    onClick={() => deleteUser(user.id)}
                    className="
                      bg-danger
                      hover:bg-dangerHover
                      text-white
                      px-3
                      py-1
                      rounded-lg
                    "
                  >
                    Excluir
                  </button>


                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


    </main>

  </div>
);
}



export default Admin;