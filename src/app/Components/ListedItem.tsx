import Image from "next/image";
import trash_icon from "../../../public/assets/trash_icon.svg";
import add_icon from "../../../public/assets/add_icon.svg";
import subtract_icon from "../../../public/assets/subtract_icon.svg";

export default function ListedItem({
  item_name,
  quantity,
}: {
  item_name: string;
  quantity: string;
}) {
  const edit_mode = true;

  if (true === edit_mode) {
    return (
      <li className="flex flex-row justify-between mt-1">
        <div className="flex flex-row">
          <Image src={trash_icon} alt="Delete" className="w-6 mr-2" />
          {item_name}
        </div>
        <div className="flex flex-row">
          <Image src={subtract_icon} alt="Less" className="w-4 mr-1" />
          <span className="border border-gray-800 rounded-xl px-4 text-base">
            {quantity} pcs
          </span>
          <Image src={add_icon} alt="More" className="w-4 ml-1" />
        </div>
      </li>
    );
  } else {
    return (
      <li className="flex flex-row justify-between mt-1">
        {item_name}
        <span className="border border-gray-800 rounded-xl px-4 text-base">
          {quantity} pcs
        </span>
      </li>
    );
  }
}
