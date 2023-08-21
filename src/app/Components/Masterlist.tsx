import React from "react";
import Item from "./Item";

import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";

/////////////////////////////////////////////////
// TEST DATA
const MASTER_LIST = {
  MasterList: [
    {
      category: "Fruits and Vegetables",
      items: [
        { name: "Apples", id: "1" },
        { name: "Bananas", id: "2" },
      ],
      id: "1",
    },
    {
      category: "Beverages",
      items: [
        { name: "Orange Juice", id: "1" },
        { name: "Milk", id: "2" },
      ],
      id: "2",
    },
    { category: "Kitchen", items: [{ name: "Noodles", id: "1" }], id: "3" },
    {
      category: "Grains",
      items: [
        { name: "Ganador", id: "1" },
        { name: "Cornflakes", id: "2" },
      ],
      id: "4",
    },
    {
      category: "Bread",
      items: [{ name: "Ichipan Slice Bread", id: "1" }],
      id: "5",
    },
    {
      category: "Canned Food",
      items: [
        { name: "Spam", id: "1" },
        { name: "Century Tuna", id: "2" },
        { name: "Vienna Sausage", id: "3" },
        { name: "Hereford Corned Beef", id: "4" },
      ],
      id: "6",
    },
    {
      category: "Cleaning",
      items: [
        { name: "Domex Blue Toilet Bowl Cleaner", id: "1" },
        { name: "Domex Yellow Stain and Limescale Cleaner", id: "2" },
        { name: "Cif All Around Cleaner", id: "3" },
        { name: "Ariel Liquid Detergent", id: "4" },
        { name: "Ajax Dishwashing Liquid", id: "5" },
        { name: "Scotchbrite", id: "6" },
      ],
      id: "7",
    },
    {
      category: "Condiments",
      items: [
        { name: "Golden Fiesta Palm Cooking Oil", id: "1" },
        { name: "Iodized Salt", id: "2" },
        { name: "Del Monte Ketchup", id: "3" },
      ],
      id: "8",
    },
    {
      category: "Hygiene",
      items: [
        { name: "Old Spice High Endurance Deo", id: "1" },
        { name: "Dove Body Soap Mens", id: "2" },
        { name: "Modess with wings", id: "3" },
        { name: "Carefree Pantiliners", id: "4" },
        { name: "PH Care Feminine Wash", id: "5" },
        { name: "Cottonbuds", id: "6" },
        { name: "Hygienix Alcohol", id: "7" },
      ],
      id: "9",
    },
    {
      category: "Candies",
      items: [],
      id: "10",
    },
  ],
};

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
