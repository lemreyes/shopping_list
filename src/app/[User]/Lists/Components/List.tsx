"use client";
import ListCard from "./ListCard";
import { useState } from "react";

export default function List({
  list_items,
  userId,
}: {
  list_items: Array<IList>;
  userId: number;
}) {
  const [editMode, setEditMode] = useState(false);

  const hdlEditBtnClick = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <>
      <div
        className={`flex flex-rows items-center p-2 ${
          editMode ? `bg-orange-100` : `bg-white`
        } rounded-lg`}
      >
        <button
          className="px-4 py-1 font-bold text-lg border border-gray-900 bg-white hover:bg-gray-600 hover:text-white rounded-lg hover:"
          onClick={hdlEditBtnClick}
        >
          {editMode ? "Stop Editing" : "Edit List"}
        </button>
        {editMode && <h2 className="ml-2 text-red-900">Edit mode is on.</h2>}
      </div>
      {list_items.length > 0 ? (
        list_items.map((list_items) => {
          return (
            <ListCard
              key={list_items.id}
              id={list_items.id}
              list_name={list_items.list_name}
              updated_at={list_items.updated_at}
              user_id={userId}
              editMode={editMode}
            />
          );
        })
      ) : (
        <p>No lists found.</p>
      )}
    </>
  );
}
