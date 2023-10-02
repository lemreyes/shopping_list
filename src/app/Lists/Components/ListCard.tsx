export default function ListCard({
  id,
  list_name,
  updated_at,
  is_done,
  list_url,
}: {
  id: number;
  list_name: string;
  updated_at: Date;
  is_done: boolean;
  list_url: string;
}) {
  return (
    <div className="border border-gray-200 p-4">
      <h2 className="text-xl font-bold">{list_name}</h2>
      <div>{updated_at.toDateString()}</div>
      <div>{is_done}</div>
      <div>
        <p>Preview is here...</p>
      </div>
    </div>
  );
}
