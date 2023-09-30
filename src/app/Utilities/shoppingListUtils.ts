// get all items from all categories
export function getAllShoppingListItems(shoppingList: Array<Category>) {
  const shoppingListItems: Array<ShoppingListItem> = [];
  for (let i = 0; i < shoppingList.length; i++) {
    shoppingListItems.concat(shoppingList[i].items);
  }

  return shoppingListItems;
}
