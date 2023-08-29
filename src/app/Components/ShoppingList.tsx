"use client";
import { useState } from "react";
import Image from "next/image";
import ListSaveButton from "./ListSaveButton";
import edit_list_icon from "../../../public/assets/edit_icon.svg";
import edit_active_icon from "../../../public/assets/edit_active_icon.svg";
import ListedItem from "./ListedItem";

import { useShoppingListStore } from "../Store/shoppinglist_store";

export default function ShoppingList() {
  let [editMode, setEditMode] = useState(false);

  const shoppingList: Array<Category> = useShoppingListStore(
    (state: any) => state.shoppingList
  );

  const hdlEditButton = () => {
    editMode === true ? setEditMode(false) : setEditMode(true);
  };

  return (
    <div className="flex flex-col justify-between min-h-full">
      <div>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl">Shopping List</h2>
          <button onClick={hdlEditButton} className="hover:bg-white hover:rounded-full p-1">
            <Image
              src={editMode ? edit_active_icon : edit_list_icon}
              alt="Edit"
              className="w-8"
            />
          </button>
        </div>

        {shoppingList.map((category: Category) => {
          return (
            <div key={category.id}>
              <h3 className="text-sm mt-4">{category.category_name}</h3>
              <ul>
                {category.items.map((item: Item) => {
                  return (
                    <ListedItem
                      key={item.id}
                      category_id={category.id}
                      item_id={item.id}
                      item_name={item.name}
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
