import calendar_icon from "../../../../../public/assets/calendar_icon.svg";
import Image from "next/image";

import prisma from "../../../Utilities/prismaUtils";
import Link from "next/link";

export default async function ListCard({
  id,
  list_name,
  updated_at,
  is_done,
  user_id,
}: {
  id: number;
  list_name: string;
  updated_at: Date;
  is_done: boolean;
  user_id: number;
}) {
  const items = await prisma.listedItem.findMany({
    where: {
      listId: id,
    },
  });

  const count = items.length > 5 ? 5 : items.length;
  let previewString = "";
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
              <p className="text-sm">{updated_at.toLocaleDateString()}</p>
            </div>
            <div className="mt-2 border border-gray-600 bg-gray-200 w-24 rounded-full align-middle text-center text-xs justify-end">
              {is_done ? "Finished" : "Not finished"}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
