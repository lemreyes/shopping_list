import { useMasterlistStore } from "../Store/masterlist_store";
import Image from "next/image";
import Item from "./Item";
import NewItemButton from "./NewItemButton";

export default function CategoryGroup({ category }: { category: Category }) {
  const editMode = useMasterlistStore((state: any) => state.editMode);

  return (
    <div key={category.id}>
      <h3 className="text-lg font-medium mt-2 desktop:mt-4">
        {category.category_name}
      </h3>
      {category.items.length > 0 ? (
        category.items.map((item: any) => {
          return (
            <Item
              key={item.id}
              category_id={category.id}
              category={category.category_name}
              label={item.name}
              item_id={item.id}
            />
          );
        })
      ) : (
        <p>No items listed.</p>
      )}
      {editMode && (
        <NewItemButton
          category_id={category.id}
          category_name={category.category_name}
        />
      )}
    </div>
  );
}
