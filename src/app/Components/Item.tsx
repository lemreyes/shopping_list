import React from "react";
import add_icon from "../../../public/assets/add_icon.svg";
import Image from "next/image";

export default function Item({ label }: { label: string }) {
  return (
    <button value={label} className="border border-gray-300 rounded-xl p-2 mt-4 mr-4 drop-shadow-lg text-sm">
      {label} <Image src={add_icon} width={24} alt="add" className="inline" />
    </button>
  );
}
