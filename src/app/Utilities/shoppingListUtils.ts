// get all items from all categories
export function getAllShoppingListItems(shoppingList: Array<TShoppingListCategory>) {
  let shoppingListItems: Array<TShoppingListItem> = [];

  for (let i = 0; i < shoppingList.length; i++) {
    shoppingListItems = shoppingListItems.concat(shoppingList[i].items);
  }

  return shoppingListItems;
}

export function createCategorizedShoppingList(
  shoppingListItems: Array<TShoppingListItem>,
  masterList: Array<TCategory>
) {
  const categorizedShoppingList: Array<TShoppingListCategory> = [];

  for (let i = 0; i < shoppingListItems.length; i++) {
    // find if existing cateogry
    const category = categorizedShoppingList.find((category: TShoppingListCategory) => {
      return category.id === shoppingListItems[i].categoryId;
    });
    if (!category) {
      // find category name from masterlist
      const masterCategory = masterList.find((category: TCategory) => {
        return category.id === shoppingListItems[i].categoryId;
      });

      // create new category
      const newCategory: TShoppingListCategory = {
        id: masterCategory?.id as number,
        category_name: masterCategory?.category_name as string,
        items: [],
      };

      newCategory.items.push(shoppingListItems[i]);
      categorizedShoppingList.push(newCategory);
    } else {
      category.items.push(shoppingListItems[i]);
    }
  }

  return categorizedShoppingList;
}
