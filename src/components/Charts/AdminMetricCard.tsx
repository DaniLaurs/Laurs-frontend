import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AdminMetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  growth?: number;
  delay?: number;
}

export default function AdminMetricCard({
  title,
  value,
  icon,
  growth,
  delay = 0,
}: AdminMetricCardProps) {
  const isPositive = (growth ?? 0) >= 0;
return (
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.4,
       delay
    }}
    className="
      bg-surface
      border
      border-border
      rounded-3xl
      p-6
      shadow-sm
      hover:shadow-lg
      transition
    "
  >
    <div className="flex items-center justify-between mb-5">
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-secondary
          flex
          items-center
          justify-center
          text-primary
        "
      >
        {icon}
      </div>
    </div>

    {growth !== undefined && (
      <div
        className={`
          inline-flex
          items-center
          gap-1
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
          ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
      >
        {isPositive ? "↑" : "↓"}

        {Math.abs(growth)}%
      </div>
    )}
  </motion.div>
);
}