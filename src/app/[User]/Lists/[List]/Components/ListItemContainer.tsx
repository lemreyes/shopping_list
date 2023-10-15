"use client";
import { useState } from "react";
import ListItem from "./ListItem";

export default function ListItemContainer({
  listItems,
}: {
  listItems: Array<TShoppingListItem>;
}) {
  const [listItemsArray, setListItemsArray] =
    useState<Array<TShoppingListItem>>(listItems);

  const hdlListUpdate = (id: number, isPurchased: boolean) => {
    const index = listItemsArray.findIndex((listItem) => listItem.id === id);

    listItemsArray[index].is_purchased = isPurchased;

    const newListItemsArray = [...listItemsArray];
    newListItemsArray.sort((a, b) => {
      if (a.is_purchased === b.is_purchased) {
        return a.listed_item_name.localeCompare(b.listed_item_name);
      } else {
        return a.is_purchased ? 1 : -1;
      }
    });

    setListItemsArray(newListItemsArray);
  };

  return (
    <ul>
      {listItemsArray.length > 0 ? (
        listItemsArray.map((listItemsArray) => {
          return (
            <ListItem
              key={listItemsArray.id}
              id={listItemsArray.id}
              item_name={listItemsArray.listed_item_name}
              quantity={listItemsArray.quantity}
              is_purchased={listItemsArray.is_purchased}
              hdlListUpdate={(isPurchased: boolean) =>
                hdlListUpdate(listItemsArray.id, isPurchased)
              }
            />
          );
        })
      ) : (
        <p>No items found.</p>
      )}
    </ul>
  );
}
