// get all items from all categories
export function getAllShoppingListItems(shoppingList: Array<ShoppingListCategory>) {
  let shoppingListItems: Array<ShoppingListItem> = [];

  for (let i = 0; i < shoppingList.length; i++) {
    shoppingListItems = shoppingListItems.concat(shoppingList[i].items);
  }

  return shoppingListItems;
}

export function createCategorizedShoppingList(
  shoppingListItems: Array<ShoppingListItem>,
  masterList: Array<Category>
) {
  const categorizedShoppingList: Array<ShoppingListCategory> = [];

  for (let i = 0; i < shoppingListItems.length; i++) {
    // find if existing cateogry
    const category = categorizedShoppingList.find((category: ShoppingListCategory) => {
      return category.id === shoppingListItems[i].categoryId;
    });
    if (!category) {
      // find category name from masterlist
      const masterCategory = masterList.find((category: Category) => {
        return category.id === shoppingListItems[i].categoryId;
      });

      // create new category
      const newCategory: ShoppingListCategory = {
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
