import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

import { CHART_COLORS } from "../../theme/chartColors";
import ChartTooltip from "../Charts/ChartTooltip";

interface AdminProductsChartProps {
  data: {
    date: string;
    products: number;
  }[];
}

export default function AdminProductsChart({
  data,
}: AdminProductsChartProps) {
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
        delay: 0.6,
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
        Produtos cadastrados
      </h2>

      <div className="h-[450px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip
              content={ChartTooltip}
            />

            <Bar
              dataKey="products"
              name="Produtos"
              fill={CHART_COLORS.primary}
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
              animationEasing="ease-out"
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}