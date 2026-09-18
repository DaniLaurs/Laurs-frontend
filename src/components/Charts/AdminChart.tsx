import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    name: "Jan",
    usuarios: 20,
    lojas: 5,
  },
  {
    name: "Fev",
    usuarios: 45,
    lojas: 12,
  },
  {
    name: "Mar",
    usuarios: 80,
    lojas: 25,
  },
  {
    name: "Abr",
    usuarios: 120,
    lojas: 40,
  },
  {
    name: "Mai",
    usuarios: 180,
    lojas: 65,
  },
];


export default function AdminChart() {

  return (
        <div
        className="
            bg-surface
            border
            border-border
            rounded-3xl
            shadow-sm
            p-8
        "
        >
      <h2
        className="
          text-2xl
          font-bold
          text-text
          mb-6
        "
      >
        Crescimento da Plataforma
      </h2>


      <div className="h-[450px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis 
              dataKey="name"
            />

            <YAxis />

            <Tooltip />


            <Line
              type="monotone"
              dataKey="usuarios"
              stroke="#7C3AED"
              strokeWidth={3}
            />


            <Line
              type="monotone"
              dataKey="lojas"
              stroke="#38BDF8"
              strokeWidth={3}
            />


          </LineChart>

        </ResponsiveContainer>

      </div>


    </div>
  );
}