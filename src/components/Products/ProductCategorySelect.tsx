import { PRODUCT_CATEGORIES } from "../../constants/productCategories";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductCategorySelect({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-3 rounded-xl w-full"
    >
      <option value="">Selecione a categoria</option>

      {PRODUCT_CATEGORIES.map((cat) => (
  <option
    key={cat.name}
    value={cat.name}
  >
    {cat.name}
  </option>
))}
    </select>
  );
}