import React from "react";
import add_icon from "../../../public/assets/add_icon.svg";
import Image from "next/image";

import { useShoppingListStore } from "../Store/shoppinglist_store";

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
      className="border border-gray-300 rounded-xl p-2 mt-4 mr-4 drop-shadow-lg text-sm"
      onClick={hdlItemBtnClick}
    >
      {label}{" "}
      {parseInt(itemCount) > 0 ? (
        <span className="text_lg">{itemCount}</span>
      ) : (
        <Image src={add_icon} width={24} alt="add" className="inline" />
      )}
    </button>
  );
}
