import React from "react";
import add_icon from "../../../public/assets/add_icon.svg";
import trash_icon from "../../../public/assets/trash_icon.svg";
import Image from "next/image";

import { useShoppingListStore } from "../Store/shoppinglist_store";
import { useMasterlistStore } from "../Store/masterlist_store";

export default function Item({
  category_id,
  category,
  label,
  item_id,
}: {
  category_id: string;
  category: string;
  label: string;
  item_id: string;
}) {
  const shoppingList: Array<Category> = useShoppingListStore(
    (state: any) => state.shoppingList
  );
  const updateShoppingList = useShoppingListStore(
    (state: any) => state.updateShoppingList
  );

  const editMode = useMasterlistStore((state: any) => state.editMode);

  // find this category in the shoppingList
  const getItemCount = () => {
    const matchedCategory: Category | undefined = shoppingList.find(
      (categoryInList) => categoryInList.id === category_id
    );

    if (matchedCategory) {
      const matchedItem = matchedCategory.items.find(
        (itemInList) => itemInList.id === item_id
      );
      if (matchedItem) {
        return matchedItem.quantity;
      } else {
        return "0";
      }
    } else {
      return "0";
    }
  };

  const hdlItemBtnClick = () => {
    // construct object
    const newShoppingList = [...shoppingList];
    const newItem: Item = { id: item_id, name: label, quantity: "1" };

    // find the category
    const matchedCategory: Category | undefined = newShoppingList.find(
      (categoryInList) => categoryInList.id === category_id
    );
    if (matchedCategory) {
      // find if there is existing item
      const matchedItem = matchedCategory.items.find(
        (itemInList) => itemInList.id === item_id
      );
      if (matchedItem) {
        let quantity = parseInt(matchedItem.quantity);
        quantity++;
        matchedItem.quantity = quantity.toString();
      } else {
        matchedCategory.items.push(newItem);
      }
      updateShoppingList(newShoppingList);
    } else {
      // category not found so add new category
      const newCategory = {
        id: category_id,
        category_name: category,
        items: [newItem],
      };
      newShoppingList.push(newCategory);
      updateShoppingList(newShoppingList);
    }
  };

  const itemCount = getItemCount();

  return (
    <button
      value={label}
      className={`border ${
        parseInt(itemCount) > 0 ? "border-black" : "border-gray-300"
      } rounded-xl py-2 px-2 mt-2 mr-2 text-sm hover:drop-shadow-2xl hover:border-black hover:bg-gray-200`}
      onClick={hdlItemBtnClick}
    >
      {label}{" "}
      {editMode ? (
        <Image src={trash_icon} alt="delete" className="inline w-6" />
      ) : parseInt(itemCount) > 0 ? (
        <span className="text_lg ml-3">{itemCount}</span>
      ) : (
        <Image src={add_icon} alt="add" className="inline w-6" />
      )}
    </button>
  );
}
