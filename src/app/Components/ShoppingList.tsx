import Image from "next/image";
import ListSaveButton from "./ListSaveButton";
import edit_list_icon from "../../../public/assets/edit_icon.svg";
import ListedItem from "./ListedItem";

export default function ShoppingList() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <div>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl">Shopping List</h2>
          <Image src={edit_list_icon} alt="Edit" height={30} />
        </div>
        <h3 className="text-sm mt-4">Fruits and vegetables</h3>
        <ul className="text-lg">
          <ListedItem item_name="Avocado" quantity="3" />
          <ListedItem item_name="Bananas" quantity="1" />
        </ul>
        <h3 className="text-sm mt-4">Beverages</h3>
        <ul className="text-lg">
          <ListedItem item_name="Milk" quantity="1" />
          <ListedItem item_name="Orange Juice" quantity="1" />
        </ul>
      </div>
      <ListSaveButton />
    </div>
  );
}
