"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import search_icon from "../../../public/assets/search_icon.svg";
import CategoryGroup from "./CategoryGroup";

import { useMasterlistStore } from "../Store/masterlist_store";
import NewCategoryButton from "./NewCategoryButton";
import { TCategory } from "../Types/Types";
import { Themes } from "../Types/Enums";
import { getThemeClassName } from "../Utilities/ThemeUtils";

export default function Masterlist({ theme }: { theme: Themes }) {
  let [searchString, setSearchString] = useState("");
  let [filterResults, setFilterResults] = useState<TCategory[]>([]);

  const categories: Array<TCategory> = useMasterlistStore(
    (state: any) => state.categories
  );

  const editMode = useMasterlistStore((state: any) => state.editMode);
  const setEditMode = useMasterlistStore((state: any) => state.setEditMode);

  const hdlSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);

    searchString = searchString.toLowerCase();

    const searchResults = categories.reduce(
      (results: TCategory[], category: TCategory) => {
        const matchingItems = category.items?.filter((item) =>
          item.item_name.toLowerCase().includes(searchString)
        );

        if (matchingItems.length > 0) {
          let filteredCategory: TCategory = {
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

  const themeClassName = getThemeClassName(theme);

  useEffect(() => {
    document.body.classList.add(`${themeClassName}`);
    document.body.classList.add(`bg-bodyBg`);
  }, [themeClassName]);

  return (
    <div className="ml-4 mt-2 p-1 desktop:ml-4 desktop:mt-8 desktop:w-[70%]">
      <div
        className={`${themeClassName} flex flex-row p-4 ${
          editMode && `bg-orange-200`
        }`}
      >
        <h2
          className={`${themeClassName} font-bold text-2xl ${
            editMode ? `text-gray-800` : `text-defaultColor`
          }`}
        >
          Master List
        </h2>
        <button
          className={`${themeClassName} border border-formButtonBorder bg-formButtonBg text-formButtonText rounded-lg ml-16 px-4 
                      hover:bg-formButtonBgHover hover:text-formButtonTextHover disabled:bg-formButtonBgDisabled disabled:text-formButtonTextDisabled`}
          onClick={hdlMasterlistEdit}
          disabled={searchString.length > 0}
        >
          {editMode ? "Stop Editing" : "Edit"}
        </button>
        {editMode && (
          <span className={`${themeClassName} text-colorWarning ml-2`}>
            Edit masterlist mode ON
          </span>
        )}
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
      {editMode && <NewCategoryButton />}

      {searchString.length === 0
        ? categories.map((category: TCategory) => {
            return (
              <CategoryGroup
                key={category.id}
                category={category}
                theme={theme}
              />
            );
          })
        : filterResults.map((category: TCategory) => {
            return (
              <CategoryGroup
                key={category.id}
                category={category}
                theme={theme}
              />
            );
          })}
    </div>
  );
}
