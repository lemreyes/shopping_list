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

  const hdlItemBtnClick = useCallback(
    (
      label: string,
      item_id: number,
      category_id: number,
      categoryName: string,
      handleClickOpen: () => void
    ) => {
      if (editMode) {
        handleClickOpen();
      } else {
        // construct object
        const newShoppingList = [...shoppingList];
        const newListItem: TShoppingListItem = {
          id: 0,
          listed_item_name: label,
          quantity: 1,
          is_purchased: false,
          masterItemId: item_id,
          categoryId: category_id,
          categoryName: categoryName,
          listId: activeListId,
        };

        // find the category
        const matchedCategory: TShoppingListCategory | undefined =
          newShoppingList.find(
            (categoryInList) => categoryInList.id === category_id
          );
        if (matchedCategory) {
          // find if there is existing item
          const matchedItem = matchedCategory.items?.find(
            (itemInList: TShoppingListItem) =>
              itemInList.masterItemId === item_id
          );
          if (matchedItem) {
            matchedItem.quantity++;
          } else {
            matchedCategory.items?.push(newListItem);
          }
          updateShoppingList(newShoppingList);
        } else {
          // category not found so add new category
          const newCategoryInList = {
            id: category_id,
            category_name: categoryName,
            items: [newListItem],
          };
          newShoppingList.push(newCategoryInList);
          updateShoppingList(newShoppingList);
        }
      }
    },
    [activeListId, editMode, shoppingList, updateShoppingList]
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
              updateMasterList={updateMaterList}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpenSnackbar={setOpenSnackbar}
              getItemCount={getItemCount}
              hdlItemBtnClick={hdlItemBtnClick}
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
