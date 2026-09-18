import type { TooltipContentProps } from "recharts";

function formatTooltipDate(date: string) {
  const formatted = new Date(date);

  return formatted.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(".", "");
}

export default function ChartTooltip({
  active,
  payload,
  label,
}: TooltipContentProps) {

  if (!active || !payload?.length) {
    return null;
  }


  return (
    <div
      className="
        bg-surface
        border
        border-border
        rounded-2xl
        shadow-xl
        p-5
        min-w-[220px]
        animate-in
        fade-in
        duration-200
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          mb-4
          text-sm
          font-semibold
          text-text
        "
      >
        <span>
          📅
        </span>

        <span>
          {formatTooltipDate(String(label))}
        </span>
      </div>


      <div
        className="
          space-y-3
        "
      >

        {payload.map((entry) => (

          <div
            key={String(entry.dataKey)}
            className="
              flex
              items-center
              justify-between
              gap-8
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  w-3
                  h-3
                  rounded-full
                "
                style={{
                  backgroundColor: entry.color,
                }}
              />

              <span
                className="
                  text-sm
                  text-gray-500
                "
              >
                {entry.name}
              </span>

            </div>


            <span
              className="
                font-bold
                text-text
              "
            >
              {entry.value}
            </span>


          </div>

        ))}

      </div>

    </div>
  );
}