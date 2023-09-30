export async function getMasterlist() {
  const response = await fetch("/api/masterlist", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Fetch error");
  }

  const responseData = await response.json();

  return responseData;
}

export async function createNewCategory(category_name: string) {
  const response = await fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      categoryName: category_name,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function createNewItem(item_name: string, category_id: number) {
  const response = await fetch("/api/item", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      itemName: item_name,
      categoryId: category_id,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function deleteItem(item_id: number) {
  const response = await fetch("/api/item", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      itemId: item_id,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function createItemWithNewCategory(
  new_category_name: string,
  item_name: string
) {
  const response = await fetch("/api/categoryItem", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      categoryName: new_category_name,
      itemName: item_name,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function createNewList(
  list_name: string,
  shopping_list: Array<ShoppingListItem>
) {
  const response = await fetch("/api/activelist", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listName: list_name,
      shoppingList: shopping_list,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function updateList(
  list_id: number,
  shopping_list: Array<ShoppingListItem>
) {
  const response = await fetch("/api/activelist", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listId: list_id,
      shoppingList: shopping_list,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}
