import { useShoppingListStore } from "../Store/shoppinglist_store";
import Item from "./Item";

export default function CategoryGroup({ category }: { category: Category }) {

  return (
    <div key={category.id}>
      <h3 className="text-lg font-medium mt-2 desktop:mt-4">{category.category_name}</h3>
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
    </div>
  );
}
