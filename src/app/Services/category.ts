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
