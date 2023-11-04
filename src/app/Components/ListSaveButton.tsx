import React, { ChangeEvent, useEffect, useState } from "react";
import { useShoppingListStore } from "../Store/shoppinglist_store";
import { useMasterlistStore } from "../Store/masterlist_store";
import { createNewList, updateList } from "../Services/fetchWrapper";
import { useSnackbarStore } from "../Store/snackbar_store";
import {
  createCategorizedShoppingList,
  getAllShoppingListItems,
} from "../Utilities/shoppingListUtils";
import { TShoppingListCategory } from "../Types/Types";

export default function ListSaveButton() {
  const activeListId = useShoppingListStore((state: any) => state.activeListId);
  const updateActiveListId = useShoppingListStore(
    (state: any) => state.updateActiveListId
  );
  const activeListName = useShoppingListStore(
    (state: any) => state.activeListName
  );
  const updateActiveListName = useShoppingListStore(
    (state: any) => state.updateActiveListName
  );
  const shoppingList: Array<TShoppingListCategory> = useShoppingListStore(
    (state: any) => state.shoppingList
  );
  const updateShoppingList = useShoppingListStore(
    (state: any) => state.updateShoppingList
  );
  const masterlist = useMasterlistStore((state: any) => state.categories);

  const setSnackbarMessage = useSnackbarStore((state: any) => state.setMessage);
  const setOpenSnackbar = useSnackbarStore(
    (state: any) => state.setOpenSnackbar
  );
  const setSeverity = useSnackbarStore((state: any) => state.setSeverity);

  const [listName, setListName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setListName(activeListName);
  }, [activeListName]);

  useEffect(() => {
    if ((listName !== "" && listName) && shoppingList.length !== 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [listName, shoppingList]);

  const hdlListNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const hdlSaveButton = async () => {
    // extract all shopping list items
    const shoppingListItems = getAllShoppingListItems(shoppingList);

    if (!activeListId || listName != activeListName) {
      try {
        // no active list, create new list and create listed items on DB
        const responseData = await createNewList(listName, shoppingListItems);

        const activeListId = responseData.activeListId;
        updateActiveListId(activeListId);
        updateActiveListName(listName);

        setSnackbarMessage(`${listName} list was successfully saved.`);
        setSeverity("success");
        setOpenSnackbar(true);

        const savedShoppingList = createCategorizedShoppingList(
          responseData.savedShoppingList,
          masterlist
        );

        updateShoppingList(savedShoppingList);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setSnackbarMessage(error.message);
          setSeverity("error");
          setOpenSnackbar(true);
        }
      }
    } else {
      // there is current active list, perform incremental update
      try {
        const responseData = await updateList(activeListId, shoppingListItems);

        setSnackbarMessage(`${activeListName} list was successfully updated.`);
        setSeverity("success");
        setOpenSnackbar(true);

        const categorizedShoppingList = createCategorizedShoppingList(
          responseData.updatedShoppingList,
          masterlist
        );

        updateShoppingList(categorizedShoppingList);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setSnackbarMessage(error.message);
          setSeverity("error");
          setOpenSnackbar(true);
        }
      }
    }
  };

  return (
    <div className="flex flex-row mt-20">
      <input
        type="text"
        placeholder="Name of list"
        className="py-2 pl-2 pr-8 rounded-lg border border-gray-700 w-full"
        onChange={hdlListNameChange}
        defaultValue={listName}
      />
      <button
        className="p-2 bg-gray-700 border border-gray-700 text-white rounded-lg -ml-8 hover:bg-white hover:text-gray-700 disabled:bg-gray-400 disabled:text-black"
        disabled={isButtonDisabled}
        onClick={hdlSaveButton}
      >
        Save
      </button>
    </div>
  );
}
