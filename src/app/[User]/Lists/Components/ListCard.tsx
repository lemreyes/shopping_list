"use client";
import calendar_icon from "../../../../../public/assets/calendar_icon.svg";
import trash_icon from "../../../../../public/assets/trash_icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getListItems } from "@/app/Services/fetchWrapper";

export default function ListCard({
  id,
  list_name,
  updated_at,
  user_id,
  editMode,
}: {
  id: number;
  list_name: string;
  updated_at: Date;
  user_id: number;
  editMode: boolean;
}) {
  const [items, setItems] = useState<Array<ShoppingListItem> | undefined>(
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

  return (
    <article className="border border-gray-200 px-4 py-1 my-4">
      <Link
        href={{
          pathname: `/${user_id}/Lists/${list_name}`,
          query: {
            id: id,
          },
        }}
      >
        <h2 className="text-xl font-bold">{list_name}</h2>
        <div className="flex flex-row justify-between">
          <div className="w-2/3">
            <p className="text-xs">{previewString}</p>
          </div>
          <div className="">
            <div className=" justify-self-end flex flex-row items-center">
              <Image
                src={calendar_icon}
                alt="calendar_icon"
                className="w-6 mr-1"
              />
              <p className="text-sm">{updated_at.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Link>
      {editMode && (
        <button className="px-4 py-1 border border-red-800 bg-red-800 hover:bg-white hover:text-red-800 text-white text-xs font-bold rounded-md mt-1 mb-1 w-full">
          Delete List
        </button>
      )}
    </article>
  );
}
