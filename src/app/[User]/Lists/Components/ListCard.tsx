"use client";
import calendar_icon from "../../../../../public/assets/calendar_icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getListItems } from "@/app/Services/fetchWrapper";

export default function ListCard({
  id,
  list_name,
  updated_at,
  user_id,
}: {
  id: number;
  list_name: string;
  updated_at: Date;
  user_id: number;
}) {
  const [items, setItems] = useState<Array<ShoppingListItem> | undefined>(undefined);
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
    <Link
      href={{
        pathname: `/${user_id}/Lists/${list_name}`,
        query: {
          id: id,
        },
      }}
    >
      <article className="border border-gray-200 p-4 my-4">
        <h2 className="text-xl font-bold">{list_name}</h2>
        <div className="grid grid-cols-2">
          <div>
            <p className="text-sm">{previewString}</p>
          </div>
          <div className="justify-self-end">
            <div className="flex flex-row items-center">
              <Image
                src={calendar_icon}
                alt="calendar_icon"
                className="w-6 mr-1"
              />
              <p className="text-sm">{updated_at.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
