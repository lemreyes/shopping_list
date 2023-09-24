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

  console.log("Response", response);

  const responseData = await response.json();
  console.log("Response data: ", responseData);

  if (!response.ok) {
    console.log("Throw error");
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
