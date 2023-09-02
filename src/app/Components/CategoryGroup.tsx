import { useMasterlistStore } from "../Store/masterlist_store";
import Image from "next/image";
import Item from "./Item";
import add_icon from "../../../public/assets/add_icon.svg";

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
              item_id={`${category.id}+${item.id}`}
            />
          );
        })
      ) : (
        <p>No items listed.</p>
      )}
      {editMode && (
        <button
          className={`border rounded-xl py-2 px-2 mt-2 mr-2 text-sm text-orange-800 bg-orange-200 hover:drop-shadow-2xl hover:border-orange-800 hover:bg-orange-100`}
        > New Item
          <Image src={add_icon} alt="add" className="inline w-6" />
        </button>
      )}
    </div>
  );
}
