import React, { ChangeEvent, useState } from "react";
import { useShoppingListStore } from "../Store/shoppinglist_store";
import { createNewList } from "../Services/fetchWrapper";

export default function ListSaveButton() {
  const activeListId = useShoppingListStore((state: any) => state.activeListId);
  const updateActiveListId = useShoppingListStore(
    (state: any) => state.updateActiveListId
  );
  const shoppingList: Array<Category> = useShoppingListStore(
    (state: any) => state.shoppingList
  );


  const [listName, setListName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const hdlListNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);

    if (listName !== "" && shoppingList.length !== 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

    console.log(isButtonDisabled);
  };

  const hdlSaveButton = async () => {
    if (!activeListId) {
      // no active list, create new list and create listed items on DB
      const responseData = await createNewList(listName, shoppingList);

      const activeListId = responseData.activeListId;
      console.log("aciveListId", activeListId);
      updateActiveListId(activeListId);
    } else {
      // there is current active list, perform incremental update
      /*    
            if listName is different from name in active list
            this means user changed the name of list
            create new list entry in db and update active list id
      */
    }
  };

  return (
    <div className="flex flex-row mt-20">
      <input
        type="text"
        placeholder="Name of list"
        className="py-2 pl-2 pr-8 rounded-lg border border-gray-700 w-full"
        onChange={hdlListNameChange}
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
