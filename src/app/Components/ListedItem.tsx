export default function ListedItem({
  item_name,
  quantity,
}: {
  item_name: string;
  quantity: string;
}) {
  return (
    <li className="flex flex-row justify-between mt-1">
      {item_name}
      <span className="border border-gray-800 rounded-xl px-4 text-base">
        {quantity} pcs
      </span>
    </li>
  );
}
