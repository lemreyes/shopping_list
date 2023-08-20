import React from "react";
import ShoppingList from "./ShoppingList";

export default function ActiveListPanel() {
  return (
    <aside className="p-8 bg-gray-200 min-w-[30%] min-h-full">
      <div className="min-h-full">
        <section className="rounded-xl p-8 bg-gray-900 text-white mb-8">
          <p>An item is not on the list?</p>
          <button className="bg-white text-black mt-2 py-1 px-4 rounded-lg">
            Add it
          </button>
        </section>
        <ShoppingList />
      </div>
    </aside>
  );
}
