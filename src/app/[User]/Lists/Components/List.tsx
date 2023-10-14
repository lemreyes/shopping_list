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
      {list_items.length > 0 ? (
        list_items.map((list_items) => {
          return (
            <ListCard
              key={list_items.id}
              id={list_items.id}
              list_name={list_items.list_name}
              updated_at={list_items.updated_at}
              is_done={list_items.is_done}
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
