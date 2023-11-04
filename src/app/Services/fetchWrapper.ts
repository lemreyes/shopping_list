import { Themes } from "../Types/Enums";
import { TShoppingListItem } from "../Types/Types";

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
  shopping_list: Array<TShoppingListItem>
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
  list_name: string,
  shopping_list: Array<TShoppingListItem>
) {
  const response = await fetch("/api/activelist", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listId: list_id,
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

/**
 * Updates the archive status of the list
 * @param list_id ID of targeted list
 * @param is_archived Archiving status
 * @returns The updated list.
 */
export async function updateListArchiveStatus(
  list_id: number,
  is_archived: boolean
) {
  const response = await fetch("/api/lists", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listId: list_id,
      archivedStatus: is_archived,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

/**
 * @description Fetch wrapper to copy and create a new list
 * @param srcListId Id of list to be copied
 * @param destListName Name of the new list
 * @returns
 */
export async function copyList(srcListId: number, destListName: string) {
  const response = await fetch("/api/lists", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      srcListId: srcListId,
      destListName: destListName,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function deleteList(listId: number) {
  const response = await fetch("/api/lists", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listId: listId,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function getListItems(id: number) {
  const response = await fetch("/api/listItem", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listId: id,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function updateListItemCheck(id: number, checked_status: boolean) {
  const response = await fetch("/api/listItem", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      listItemId: id,
      is_purchased: checked_status,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}

export async function updateSetting(
  id: number,
  profile_image: File | null,
  name: string | undefined,
  theme: Themes
) {
  const body = new FormData();

  body.append("id", id.toString());
  if (name) {
    body.append("name", name);
  }

  if (profile_image) {
    body.append("profile_image", profile_image);
  }

  if (theme != null) {
    body.append("theme", theme.toString());
  }

  const isEmpty = body.entries().next().done;
  if (isEmpty) {
    throw new Error("Nothing to update.");
  }

  const response = await fetch("/api/setting/", {
    method: "POST",
    body,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.errorMessage);
  }

  return responseData;
}
