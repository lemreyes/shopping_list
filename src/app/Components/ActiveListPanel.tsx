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

  return (
    <section
      id="activeList"
      className="flex flex-col px-4 py-8 mt-8 desktop:mt-0 pb-20 desktop:pb-4 bg-gray-200 desktop:w-[30%] desktop:min-h-full desktop:float-right"
    >
      {showForm === false && (
        <div>
          <section className="rounded-xl p-4 bg-gray-900 text-white mb-8">
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
        <NewItemFormActiveList
          cancelHandler={hdlCancelAddItemButton}
        />
      )}
    </section>
  );
}
