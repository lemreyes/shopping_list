import { ListedItem } from "@prisma/client";
import ListCard from "./ListCard";

export default function List({
  list_items,
  userId,
}: {
  list_items: Array<IList>;
  userId: number;
}) {
  return (
    <>
      <button className="px-2 py-1 font-bold text-lg border border-gray-900 rounded-lg">Edit List</button>
      {list_items.length > 0 ? (
        list_items.map((list_items) => {
          return (
            <ListCard
              key={list_items.id}
              id={list_items.id}
              list_name={list_items.list_name}
              updated_at={list_items.updated_at}
              user_id={userId}
            />
          );
        })
      ) : (
        <p>No lists found.</p>
      )}
    </>
  );
}
