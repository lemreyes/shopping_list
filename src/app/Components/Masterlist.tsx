"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";
import CategoryGroup from "./CategoryGroup";

export default function Masterlist({
  masterlist,
}: {
  masterlist: Array<Object>;
}) {
  let [searchString, setSearchString] = useState("");

  const hdlSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    console.log(searchString);

    searchString = searchString.toLowerCase();

    const searchResults = masterlist.reduce((results, category) => {
      const matchingItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(searchString)
      );

      if (matchingItems.length > 0) {
        results.push({
          category_name: category.category_name,
          items: matchingItems,
        });
      }

      return results;
    }, []);

    console.log("searchResult", searchResults);

    return searchResults;
  };

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
          onChange={hdlSearchOnChange}
        />
      </div>

      {masterlist.map((category: Category | any) => {
        return <CategoryGroup key={category.id} category={category} />;
      })}
    </main>
  );
}
