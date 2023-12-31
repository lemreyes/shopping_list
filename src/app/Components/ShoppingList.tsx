"use client";
import { useState } from "react";
import Image from "next/image";
import ListSaveButton from "./ListSaveButton";
import edit_list_icon from "../../../public/assets/edit_icon.svg";
import edit_active_icon from "../../../public/assets/edit_active_icon.svg";
import ListedItem from "./ListedItem";

import { useShoppingListStore } from "../Store/shoppinglist_store";
import { TShoppingListCategory, TShoppingListItem } from "../Types/Types";

export default function ShoppingList() {
  let [editMode, setEditMode] = useState(false);

  const shoppingList: Array<TShoppingListCategory> = useShoppingListStore(
    (state: any) => state.shoppingList
  );

  const hdlEditButton = () => {
    editMode === true ? setEditMode(false) : setEditMode(true);
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl">Shopping List</h2>
          <button
            onClick={hdlEditButton}
            className="hover:bg-white hover:rounded-full p-1"
          >
            <Image
              src={editMode ? edit_active_icon : edit_list_icon}
              alt="Edit"
              className="w-8"
            />
          </button>
        </div>
        {editMode && (
          <div className="p-2 rounded-lg bg-orange-200 text-red-900">
            <p className="text-sm">Shopping List Edit Mode ON.</p>
          </div>
        )}

        {shoppingList.map((category: TShoppingListCategory) => {
          return (
            <div key={category.id}>
              <h3 className="text-sm mt-4">{category.category_name}</h3>
              <ul>
                {category.items.map((item: TShoppingListItem) => {
                  return (
                    <ListedItem
                      key={item.masterItemId}
                      category_id={item.categoryId as number}
                      master_item_id={item.masterItemId as number}
                      item_name={item.listed_item_name as string}
                      quantity={item.quantity}
                      edit_mode={editMode}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <ListSaveButton />
    </div>
  );
}
