"use client";

import { useRouter } from "next/navigation";

export default function ListHeading({
  listId,
  ownerId,
  listName,
  isArchived,
  themeClassName,
}: {
  listId: number;
  ownerId: number;
  listName: string;
  isArchived: boolean;
  themeClassName: string;
}) {
  const router = useRouter();

  const hdlEditButton = () => {
    const queryParamString = new URLSearchParams(
      `listId=${listId}&ownerId=${ownerId}`
    );
    router.push(`/?${queryParamString}`);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <h1
        className={`${themeClassName} text-defaultColor text-3xl font-bold mt-2 mb-4`}
      >
        {listName}
      </h1>
      <button
        className={`${themeClassName} border py-1 px-4 h-8 rounded-lg bg-formButtonBg text-formButtonText 
                  hover:bg-formButtonBgHover hover:text-formButtonTextHover hover:border-formButtonBorder 
                  disabled:bg-formButtonBgDisabled disabled:text-formButtonTextDisabled`}
        onClick={hdlEditButton}
        disabled={isArchived}
      >
        Edit this list
      </button>
    </div>
  );
}
