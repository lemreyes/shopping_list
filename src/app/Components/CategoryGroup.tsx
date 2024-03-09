import { useMasterlistStore } from "../Store/masterlist_store";
import { useSnackbarStore } from "../Store/snackbar_store";
import Item from "./Item";
import NewItemButton from "./NewItemButton";
import {
  TCategory,
  TItem,
  TShoppingListCategory,
  TShoppingListItem,
} from "../Types/Types";
import { Themes } from "../Types/Enums";
import { getThemeClassName } from "../Utilities/ThemeUtils";
import { useShoppingListStore } from "../Store/shoppinglist_store";
import { memo, useCallback, useEffect, useRef } from "react";
import { deleteItem } from "../Services/fetchWrapper";
import { traceLog } from "../Utilities/logUtils";

const CategoryGroup = memo(function CategoryGroup({
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
  const updateMasterList = useMasterlistStore(
    (state: any) => state.updateCategories
  );

  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  // confirm props changed
  const prevShoppingList = useRef(shoppingList);
  useEffect(() => {
    if (prevShoppingList.current !== shoppingList) {
      traceLog("shoppingList has changed:", shoppingList);
      prevShoppingList.current = shoppingList;
    }
  }, [shoppingList]);

  const prevactiveListId = useRef(activeListId);
  useEffect(() => {
    if (prevactiveListId.current !== activeListId) {
      traceLog("activeListId has changed:", activeListId);
      prevactiveListId.current = activeListId;
    }
  }, [activeListId]);

  const preveditMode = useRef(editMode);
  useEffect(() => {
    if (preveditMode.current !== editMode) {
      traceLog("editMode has changed:", editMode);
      preveditMode.current = editMode;
    }
  }, [editMode]);

  const prevupdateShoppingList = useRef(updateShoppingList);
  useEffect(() => {
    if (prevupdateShoppingList.current !== updateShoppingList) {
      traceLog("updateShoppingList has changed:", updateShoppingList);
      prevupdateShoppingList.current = updateShoppingList;
    }
  }, [updateShoppingList]);

  //

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
        const newShoppingList = shoppingList.map((category) => ({
          ...category,
          items: [...category.items], // Shallow copy of items array
        }));

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
        const matchedCategoryIndex = newShoppingList.findIndex(
          (categoryInList) => categoryInList.id === category_id
        );
        if (matchedCategoryIndex !== -1) {
          const matchedCategory = newShoppingList[matchedCategoryIndex];
          // find if there is an existing item
          const matchedItemIndex = matchedCategory.items.findIndex(
            (itemInList) => itemInList.masterItemId === item_id
          );
          if (matchedItemIndex !== -1) {
            const updatedItem = { ...matchedCategory.items[matchedItemIndex] };
            updatedItem.quantity++;
            matchedCategory.items[matchedItemIndex] = updatedItem;
          } else {
            matchedCategory.items.push(newListItem);
          }
          newShoppingList[matchedCategoryIndex] = matchedCategory;
        } else {
          // category not found so add new category
          const newCategoryInList = {
            id: category_id,
            category_name: categoryName,
            items: [newListItem],
          };
          newShoppingList.push(newCategoryInList);
        }

        updateShoppingList(newShoppingList);
      }
    },
    [activeListId, editMode, shoppingList, updateShoppingList]
  );

  const handleCloseYes = useCallback(
    async (item_id: number, category_id: number, handleCloseNo: () => void) => {
      // delete in database
      try {
        deleteItem(item_id);
        let itemName = "";

        // update master list
        const newMasterList = [...masterlist];
        const categoryIndex: number = masterlist.findIndex(
          (categoryInList: TCategory) => categoryInList.id === category_id
        );

        if (categoryIndex >= 0) {
          const itemIndex = masterlist[categoryIndex].items.findIndex(
            (itemInList: TItem) => itemInList.id === item_id
          );

          itemName = masterlist[categoryIndex].items[itemIndex].item_name;

          if (itemIndex >= 0) {
            newMasterList[categoryIndex].items.splice(itemIndex, 1);

            // delete category if item list is empty
            if (newMasterList[categoryIndex].items.length === 0) {
              newMasterList.splice(categoryIndex, 1);
            }
          } else {
            // do nothing
          }
        } else {
          // do nothing
        }

        updateMasterList(newMasterList);

        // close dialog
        handleCloseNo();

        setSnackbarMessage(`${itemName} was successfully deleted.`);
        setSeverity("success");
        setOpenSnackbar(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setSnackbarMessage(error.message);
          setSeverity("error");
          setOpenSnackbar(true);
        }
      }
    },
    [
      masterlist,
      setOpenSnackbar,
      setSeverity,
      setSnackbarMessage,
      updateMasterList,
    ]
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
              getItemCount={getItemCount}
              hdlItemBtnClick={hdlItemBtnClick}
              handleCloseYes={handleCloseYes}
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
});

export default CategoryGroup;
