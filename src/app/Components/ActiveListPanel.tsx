import React from "react";
import Image from "next/image";
import ListSaveButton from "./ListSaveButton";
import edit_list_icon from "../../../public/assets/edit_icon.svg";

export default function ActiveListPanel() {
  return (
    <aside className="p-8 bg-gray-200 flex flex-col justify-between">
      <div>
        <section className="rounded-xl p-8 bg-gray-900 text-white mb-8">
          <p>An item is not on the list?</p>
          <button className="bg-white text-black mt-2 py-1 px-4 rounded-lg">
            Add it
          </button>
        </section>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl">Shopping List</h2>
          <Image src={edit_list_icon} alt="Edit" height={30} />
        </div>
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
