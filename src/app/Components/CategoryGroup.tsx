import { useMasterlistStore } from "../Store/masterlist_store";
import Image from "next/image";
import Item from "./Item";
import NewItemButton from "./NewItemButton";
import { TCategory } from "../Types/Types";
import { Themes } from "../Types/Enums";
import { getThemeClassName } from "../Utilities/ThemeUtils";

export default function CategoryGroup({
  category,
  theme,
}: {
  category: TCategory;
  theme: Themes;
}) {
  const editMode = useMasterlistStore((state: any) => state.editMode);
  const themeClassName = getThemeClassName(theme);

  return (
    <div key={category.id}>
      <h3
        className={`${themeClassName} text-defaultColor text-lg font-medium mt-2 desktop:mt-4`}
      >
        {category.category_name}
      </h3>
      {category.items.length > 0 ? (
        category.items.map((item: any) => {
          return (
            <Item
              key={item.id}
              category_id={category.id}
              category={category.category_name}
              label={item.item_name}
              item_id={item.id}
              theme={theme}
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
