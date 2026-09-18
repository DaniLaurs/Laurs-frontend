import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

import { CHART_COLORS } from "../../theme/chartColors";
import ChartTooltip from "../../components/Charts/ChartTooltip";

interface AdminGrowthChartProps {
  data: {
    date: string;
    users: number;
    stores: number;
    products: number;
  }[];
}

function formatChartDate(date: string) {
  const formatted = new Date(date);

  return formatted.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  })
  .replace(".", "");
}

export default function AdminGrowthChart({
  data,
}: AdminGrowthChartProps) {

return (
  <motion.div
    initial={{
      opacity: 0,
      y: 30,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.5,
      delay: 0.4,
    }}
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

          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              opacity={0.3}
            />


            <XAxis
              dataKey="date"
              tickFormatter={formatChartDate}
              tickLine={false}
              axisLine={false}
/>


            <YAxis
              tickLine={false}
              axisLine={false}
            />


            <Tooltip
              content={ChartTooltip}
              cursor={{
                strokeDasharray: "4 4",
              }}
            />


            <Legend
              verticalAlign="top"
              height={40}
            />


            <Line
              type="monotone"
              dataKey="users"
              name="Usuários"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
              animationDuration={1500}
              animationEasing="ease-out"
            />


            <Line
              type="monotone"
              dataKey="stores"
              name="Lojas"
              stroke={CHART_COLORS.secondary}
              strokeWidth={3}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            animationDuration={1500}
            animationEasing="ease-out"
            />

                      <Line
            type="monotone"
            dataKey="products"
            name="Produtos"
            stroke={CHART_COLORS.accent}
            strokeWidth={3}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
            animationDuration={1500}
            animationEasing="ease-out"
          />


          </LineChart>

        </ResponsiveContainer>

      </div>
    </motion.div>
  );
}