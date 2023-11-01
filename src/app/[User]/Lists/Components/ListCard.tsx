"use client";
import calendar_icon from "../../../../../public/assets/calendar_icon.svg";
import calendar_icon_dark from "../../../../../public/assets/calendar_icon_dark.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getListItems } from "@/app/Services/fetchWrapper";
import { TShoppingListItem } from "@/app/Types/Types";
import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";

export default function ListCard({
  id,
  list_name,
  updated_at,
  user_id,
  is_archived,
  editMode,
  hdlDeleteBtn,
  theme,
}: {
  id: number;
  list_name: string;
  updated_at: Date;
  user_id: number;
  is_archived: boolean;
  editMode: boolean;
  hdlDeleteBtn: any;
  theme: Themes;
}) {
  const [items, setItems] = useState<Array<TShoppingListItem> | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      const items = await getListItems(id);
      setItems(items);
    };

    fetchData();
  }, [id]);

  let previewString = "";
  if (items) {
    const count = items.length > 5 ? 5 : items.length;

    if (count === 0) {
      previewString = "Empty list.";
    } else {
      for (let i = 0; i < count; i++) {
        previewString = previewString.concat(`${items[i].listed_item_name}, `);
      }
      if (items.length > 5) {
        previewString =
          previewString.substring(0, previewString.length - 2) + "...";
      }
    }
  } else {
    previewString = "Loading ...";
  }

  const hdlDeleteBtnClick = () => {
    hdlDeleteBtn(list_name);
  };

  const themeClassName = getThemeClassName(theme);

  return (
    <article
      className={`${themeClassName} border border-gray-200 px-4 py-1 my-4`}
    >
      <Link
        href={{
          pathname: `/${user_id}/Lists/${list_name}`,
          query: {
            id: id,
          },
        }}
      >
        <div className="flex flex-row justify-between">
          <div className="w-2/3">
            <h2
              className={`${themeClassName} text-defaultColor text-xl font-bold`}
            >
              {list_name}
            </h2>
            <p className={`${themeClassName} text-xs text-defaultColor`}>
              {previewString}
            </p>
          </div>
          <div className="">
            <div className="mb-1">
              {is_archived ? (
                <div
                  className={`${themeClassName} text-gray-900 text-center text-xs p-0.5 rounded-md bg-gray-300`}
                >
                  Archived
                </div>
              ) : (
                <div
                  className={`${themeClassName} text-white text-center text-xs p-0.5 rounded-md bg-green-600`}
                >
                  Open
                </div>
              )}
            </div>
            <div className=" justify-self-end flex flex-row items-center">
              <Image
                src={theme === 0 ? calendar_icon : calendar_icon_dark}
                alt="calendar_icon"
                className="w-6 mr-1 "
              />
              <p className={`${themeClassName} text-sm text-defaultColor`}>
                {updated_at.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {editMode && (
        <button
          className={`${themeClassName} px-4 py-1 border border-colorWarning bg-colorWarning hover:bg-white hover:text-red-800 
                    text-white text-xs rounded-md mt-4 mb-1 w-full`}
          onClick={hdlDeleteBtnClick}
        >
          Delete List
        </button>
      )}
    </article>
  );
}
