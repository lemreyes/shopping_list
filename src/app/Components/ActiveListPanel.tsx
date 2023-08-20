"use client";

import React from "react";
import { useState } from "react";

import ShoppingList from "./ShoppingList";
import NewItemFormActiveList from "./NewItemFormActiveList";

export default function ActiveListPanel() {
  let [showForm, setShowForm] = useState(false);

  const hdlAddItemButton = () => {
    setShowForm(true);
  };

  const hdlCancelAddItemButton = () => {
    setShowForm(false);
  };

  const hdlAddItemToList = () => {
    // TODO
    // add to shopping list

    setShowForm(false);
  }

  return (
    <aside className="p-8 bg-gray-200 w-[30%] min-h-full">
      {showForm === false && (
        <div className="min-h-full">
          <section className="rounded-xl p-8 bg-gray-900 text-white mb-8">
            <p>An item is not on the list?</p>
            <button
              className="bg-white text-black mt-2 py-1 px-4 rounded-lg"
              onClick={hdlAddItemButton}
            >
              Add it
            </button>
          </section>
          <ShoppingList />
        </div>
      )}
      {showForm === true && (
        <NewItemFormActiveList cancelHandler={hdlCancelAddItemButton} addHandler={hdlAddItemToList}/>
      )}
    </aside>
  );
}
