export default function MenuCard() {
  return (
    <div className="absolute -top-24 -left-0 bg-gray-200">
      <ul>
        <li className="py-1 px-8 font-bold hover:bg-white border-b border-gray-300 w-full">Plan</li>
        <li className="py-1 px-8 font-bold hover:bg-white border-b border-gray-300 w-full">Lists</li>
        <li className="py-1 px-8 font-bold hover:bg-white border-b">Shop</li>
      </ul>
    </div>
  );
}
