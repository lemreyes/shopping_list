"use client";

import { updateListItemCheck } from "../../../../Services/fetchWrapper";
import { ChangeEvent, useState } from "react";

export default function ListItem({
  id,
  item_name,
  quantity,
  is_purchased,
  hdlListUpdate,
}: {
  id: number;
  item_name: string;
  quantity: number;
  is_purchased: boolean;
  hdlListUpdate: any
}) {
  const [checkStatus, setCheckStatus] = useState(is_purchased);

  const hdlOnClick = async (event: ChangeEvent<HTMLInputElement>) => {
    updateListItemCheck(id, event.target.checked);
    setCheckStatus(event.target.checked);
    hdlListUpdate(event.target.checked);
  };

  return (
    <li className="flex flex-row p-2 border border-gray-200 rounded-lg mt-2">
      <input
        type="checkbox"
        className="w-8 mr-4"
        onChange={hdlOnClick}
        checked={checkStatus}
      />
      <div className="flex flex-row justify-between w-full">
        <div>{item_name}</div>
        <div className="ml-2">{quantity}</div>
      </div>
    </li>
  );
}
