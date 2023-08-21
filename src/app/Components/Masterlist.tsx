"use client";
import React from "react";
import Item from "./Item";

import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";

interface Category {
  id: string;
  category_name: string;
  items: Array<string>;
}

interface Item {
  id: string;
  name: string;
}

export default function Masterlist({
  masterlist,
}: {
  masterlist: Array<Object>;
}) {
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

      {masterlist.map((category: Category | any) => {
        console.log("category: ", category);
        return (
          <div key={category.id}>
            <h3 className="text-lg font-medium mt-8">
              {category.category_name}
            </h3>
            {category.items.length > 0 ? (
              category.items.map((item: any) => {
                console.log("Item", item);
                return <Item key={item.id} label={item.name} />;
              })
            ) : (
              <p>No items listed.</p>
            )}
          </div>
        );
      })}
    </main>
  );
}
