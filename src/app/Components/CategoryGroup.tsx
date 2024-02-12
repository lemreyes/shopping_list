import { useMasterlistStore } from "../Store/masterlist_store";
import { useSnackbarStore } from "../Store/snackbar_store";
import Item from "./Item";
import NewItemButton from "./NewItemButton";
import {
  TCategory,
  TShoppingListCategory,
  TShoppingListItem,
} from "../Types/Types";
import { Themes } from "../Types/Enums";
import { getThemeClassName } from "../Utilities/ThemeUtils";
import { useShoppingListStore } from "../Store/shoppinglist_store";
import { useCallback } from "react";

export default function CategoryGroup({
  category,
  theme,
}: {
  category: TCategory;
  theme: Themes;
}) {
  const editMode = useMasterlistStore((state: any) => state.editMode);
  const themeClassName = getThemeClassName(theme);

  const shoppingList: Array<TShoppingListCategory> = useShoppingListStore(
    (state: any) => state.shoppingList
  );
  const updateShoppingList = useShoppingListStore(
    (state: any) => state.updateShoppingList
  );
  const activeListId = useShoppingListStore((state: any) => state.activeListId);
  const masterlist = useMasterlistStore((state: any) => state.categories);
  const updateMaterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  const getItemCount = useCallback(
    (category_id: number, item_id: number) => {
      const matchedCategory: TShoppingListCategory | undefined =
        shoppingList.find(
          (categoryInList: { id: number }) => categoryInList.id === category_id
        );

      if (matchedCategory) {
        const matchedItem = matchedCategory.items?.find(
          (itemInList: TShoppingListItem) => itemInList.masterItemId === item_id
        );
        if (matchedItem) {
          return matchedItem.quantity;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    [shoppingList]
  );

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
              editMode={editMode}
              masterlist={masterlist}
              shoppingList={shoppingList}
              updateMasterList={updateMaterList}
              updateShoppingList={updateShoppingList}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpenSnackbar={setOpenSnackbar}
              activeListId={activeListId}
              getItemCount={getItemCount}
            />
          );
        })
      ) : (
        <p className={`${themeClassName} text-defaultColor`}>
          No items listed.
        </p>
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
