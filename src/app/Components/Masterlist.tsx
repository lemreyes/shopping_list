"use client";
import React from "react";
import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";
import CategoryGroup from "./CategoryGroup";

export default function Masterlist({
  masterlist,
}: {
  masterlist: Array<Object>;
}) {
  return (
    <main className="ml-4 mt-2 p-1 desktop:ml-4 desktop:mt-8">
      <div className="flex flex-row">
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
        return <CategoryGroup key={category.id} category={category} />;
      })}
    </main>
  );
}
