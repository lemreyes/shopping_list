import Image from "next/image";
import trash_icon from "../../../public/assets/trash_icon.svg";
import add_icon from "../../../public/assets/add_icon.svg";
import subtract_icon from "../../../public/assets/subtract_icon.svg";
import { useShoppingListStore } from "../Store/shoppinglist_store";

export default function ListedItem({
  category_id,
  item_id,
  item_name,
  quantity,
  edit_mode,
}: {
  category_id: string;
  item_id: string;
  item_name: string;
  quantity: string;
  edit_mode: boolean;
}) {
  const shoppingList: Array<Category> = useShoppingListStore(
    (state: any) => state.shoppingList
  );

  const updateShoppingList = useShoppingListStore(
    (state: any) => state.updateShoppingList
  );

  const newShoppingList = [...shoppingList];

  const hdlDeleteButtonClick = () => {
    const categoryIndex: number = newShoppingList.findIndex(
      (categoryInList) => categoryInList.id === category_id
    );

    if (categoryIndex >= 0) {
      const itemIndex = newShoppingList[categoryIndex].items.findIndex(
        (itemInList) => itemInList.id === item_id
      );

      if (itemIndex >= 0) {
        newShoppingList[categoryIndex].items.splice(itemIndex, 1);

        // delete category if item list is empty
        if (newShoppingList[categoryIndex].items.length === 0) {
          newShoppingList.splice(categoryIndex, 1);
        }
      } else {
        return "0";
      }
    } else {
      // do nothing
    }

    updateShoppingList(newShoppingList);
  };

  const hdlDecreaseButtonClick = () => {
    const categoryIndex: number = newShoppingList.findIndex(
      (categoryInList) => categoryInList.id === category_id
    );

    const itemIndex = newShoppingList[categoryIndex].items.findIndex(
      (itemInList) => itemInList.id === item_id
    );

    newShoppingList[categoryIndex].items[itemIndex].quantity = (
      parseInt(newShoppingList[categoryIndex].items[itemIndex].quantity) - 1
    ).toString();
    if (newShoppingList[categoryIndex].items[itemIndex].quantity === "0") {
      newShoppingList[categoryIndex].items.splice(itemIndex, 1);

      if (newShoppingList[categoryIndex].items.length === 0) {
        newShoppingList.splice(categoryIndex, 1);
      }
    }

    updateShoppingList(newShoppingList);
  };

  const hdlIncreaseButtonClick = () => {
    const categoryIndex: number = newShoppingList.findIndex(
      (categoryInList) => categoryInList.id === category_id
    );

    const itemIndex = newShoppingList[categoryIndex].items.findIndex(
      (itemInList) => itemInList.id === item_id
    );

    newShoppingList[categoryIndex].items[itemIndex].quantity = (
      parseInt(newShoppingList[categoryIndex].items[itemIndex].quantity) + 1
    ).toString();

    updateShoppingList(newShoppingList);
  };

  if (true === edit_mode) {
    return (
      <li className="flex flex-row justify-between mt-1">
        <div className="flex flex-row">
          <button onClick={hdlDeleteButtonClick}>
            <Image src={trash_icon} alt="Delete" className="w-6 mr-2" />
          </button>
          {item_name}
        </div>
        <div className="flex flex-row">
          <button onClick={hdlDecreaseButtonClick}>
            <Image src={subtract_icon} alt="Less" className="w-4 mr-1" />
          </button>
          <span className="border border-gray-800 rounded-xl px-4 text-base w-24 text-center ">
            {quantity} pcs
          </span>
          <button onClick={hdlIncreaseButtonClick}>
            <Image src={add_icon} alt="More" className="w-4 ml-1" />
          </button>
        </div>
      </li>
    );
  } else {
    return (
      <li className="flex flex-row justify-between mt-1">
        {item_name}
        <span className="border border-gray-800 rounded-xl px-4 text-base w-24 text-center ml-8 mr-8">
          {quantity} {parseInt(quantity) > 1 ? "pcs" : "pc"}
        </span>
      </li>
    );
  }
}
