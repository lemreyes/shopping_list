import React from "react";
import Item from "./Item";

import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";

/////////////////////////////////////////////////
// TEST DATA
const MASTER_LIST = [
  { category: "Fruits and Vegetables", items: ["Apples", "Bananas"] },
  { category: "Beverages", items: ["Orange Juice", "Milk"] },
  { category: "Kitchen", items: ["Noodles"] },
  { category: "Grains", items: ["Ganador", "Cornflakes"] },
  { category: "Bread", items: ["Ichipan Slice Bread"] },
  {
    category: "Canned Food",
    items: ["Spam", "Century Tuna", "Vienna Sausage", "Hereford Corned Beef"],
  },
  {
    category: "Cleaning",
    items: [
      "Domex Blue Toilet Bowl Cleaner",
      "Domex Yellow Stain and Limescale Cleaner",
      "Cif All Around Cleaner",
      "Ariel Liquid Detergent",
      "Ajax Dishwashing Liquid",
      "Scotchbrite",
    ],
  },
  {
    category: "Condiments",
    items: [
      "Golden Fiesta Palm Cooking Oil",
      "Iodized Salt",
      "Del Monte Ketchup",
    ],
  },
  {
    category: "Hygiene",
    items: [
      "Old Spice High Endurance Deo",
      "Dove Body Soap Mens",
      "Modess with wings",
      "Carefree Pantiliners",
      "PH Care Feminine Wash",
      "Cottonbuds",
      "Hygienix Alcohol",
    ],
  },
];

////////////////////////////////////////////////

export default function Masterlist() {
  return (
    <main className="ml-16 mt-8">
      <h1 className="text-4xl ">
        <span className="text-orange-600 font-bold">SyncShop</span> seamlessly
        share and shop together with real-time list updates
      </h1>
      <div className="flex flex-row mt-8">
        <h2 className="font-bold text-2xl">Master List</h2>
        <button className="border border-gray-800 rounded-lg ml-16 px-4">
          Edit
        </button>
      </div>
      <div className="flex flex-row">
        <Image
          src={search_icon}
          alt="search"
          className="w-6 h-6 absolute translate-x-1 translate-y-3"
        />
        <input
          type="text"
          placeholder="Search for an item"
          className="mt-2 border rounded-lg border-gray-400 p-1 pl-8"
        />
      </div>

      <h3 className="text-lg font-medium mt-8">Fruit and vegetables</h3>
      <Item label="Avocado" />
      <Item label="Bananas" />
      <h3 className="text-lg font-medium mt-8">Beverages</h3>
      <Item label="Milk" />
      <Item label="Orange Juice" />
    </main>
  );
}
