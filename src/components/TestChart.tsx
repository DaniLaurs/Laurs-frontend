import {
  BarChart,
  Bar,
  XAxis
} from "recharts";

const data = [
  { name: "Jan", vendas: 400 },
  { name: "Fev", vendas: 700 },
  { name: "Mar", vendas: 500 },
];

function TestChart() {
  return (
    <BarChart
      width={400}
      height={300}
      data={data}
    >
      <XAxis dataKey="name" />
      <Bar dataKey="vendas" />
    </BarChart>
  );
}

export default TestChart;