import React from "react";
import ListSaveButton from "./ListSaveButton";

export default function ActiveListPanel() {
  return (
    <aside className="p-8 bg-gray-200 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-2xl">Shopping List</h2>
        <h3 className="text-sm mt-4">Fruits and vegetables</h3>
        <ul className="text-lg">
          <li>Avocado</li>
          <li>Bananas</li>
        </ul>
        <h3 className="text-sm mt-4">Beverages</h3>
        <ul className="text-lg">
          <li>Milk</li>
          <li>Orange Juice</li>
        </ul>
      </div>
      <ListSaveButton />
    </aside>
  );
}
