"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";
import CategoryGroup from "./CategoryGroup";

import { useMasterlistStore } from "../Store/masterlist_store";

export default function Masterlist({
  masterlist,
}: {
  masterlist: Array<Category>;
}) {
  let [searchString, setSearchString] = useState("");
  let [filterResults, setFilterResults] = useState<Category[]>([]);

  const editMode = useMasterlistStore((state: any) => state.editMode);
  const setEditMode = useMasterlistStore((state: any) => state.setEditMode);

  const hdlSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);

    searchString = searchString.toLowerCase();

    const searchResults = masterlist.reduce(
      (results: Category[], category: Category) => {
        const matchingItems = category.items.filter((item) =>
          item.name.toLowerCase().includes(searchString)
        );

        if (matchingItems.length > 0) {
          let filteredCategory: Category = {
            id: category.id,
            category_name: category.category_name,
            items: matchingItems,
          };

          results.push(filteredCategory);
        }

        return results;
      },
      []
    );

    setFilterResults(searchResults);
  };

  const hdlMasterlistEdit = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <main className="ml-4 mt-2 p-1 desktop:ml-4 desktop:mt-8 desktop:w-[70%]">
      <div className="flex flex-row">
        <h2 className="font-bold text-2xl">Master List</h2>
        <button
          className="border border-gray-800 rounded-lg ml-16 px-4 hover:bg-gray-300 disabled:bg-gray-400"
          onClick={hdlMasterlistEdit}
          disabled={searchString.length > 0}
        >
          Edit
        </button>
        {
          editMode && <span className="text-red-600 ml-2">Edit masterlist mode ON</span>
        }
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
          disabled={editMode}
        />
      </div>

      {searchString.length === 0
        ? masterlist.map((category: Category | any) => {
            return <CategoryGroup key={category.id} category={category} />;
          })
        : filterResults.map((category: Category | any) => {
            return <CategoryGroup key={category.id} category={category} />;
          })}
    </main>
  );
}
