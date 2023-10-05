import { Input } from "postcss";

export default function ListItem({
  id,
  item_name,
  quantity,
  is_purchased,
}: {
  id: number;
  item_name: string;
  quantity: number;
  is_purchased: boolean;
}) {
  return (
    <tr className="p-2 bg-gray-200">
      <td>
        <input type="checkbox" className="w-4" />
      </td>
      <td>{item_name}</td>
      <td>{quantity}</td>
    </tr>
  );
}
