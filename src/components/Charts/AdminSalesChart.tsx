import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { CHART_COLORS } from "../../theme/chartColors";


const data = [
  {
    month: "Jan",
    sales: 2500,
  },
  {
    month: "Fev",
    sales: 4200,
  },
  {
    month: "Mar",
    sales: 6800,
  },
  {
    month: "Abr",
    sales: 9200,
  },
  {
    month: "Mai",
    sales: 12500,
  },
];


export default function AdminSalesChart() {

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
        Faturamento da Plataforma
      </h2>


      <div className="h-[450px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="month"
            />


            <YAxis />


            <Tooltip
              formatter={(value) =>
                Number(value).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )
              }
            />


            <Area
              type="monotone"
              dataKey="sales"
              name="Faturamento"
              stroke={CHART_COLORS.success}
              fill={CHART_COLORS.success}
              fillOpacity={0.2}
            />


          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}