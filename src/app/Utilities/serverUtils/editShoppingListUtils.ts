import { TCategory, TItem } from "@/app/Types/Types";
import prisma from "../prismaUtils";

export async function prepareDataForEdit(listId: number, userId: number) {
  let addedCategories: Array<TCategory | undefined> = [];
  let addedItems: Array<TItem | undefined> = [];

  // get list information
  const listInfo = await prisma.list.findFirst({
    where: {
      id: listId,
    },
    select: {
      id: true,
      list_name: true,
      is_done: true,
      ownerId: true,
      updated_at: true,
    },
  });
  if (listInfo === null) {
    throw Error("List not found.");
  }

  // check if there are null category Ids
  const itemsWithNullCategories = await prisma.listedItem.findMany({
    where: {
      listId: listId,
      categoryId: null,
    },
  });
  console.log("itemsWithNullCategories", itemsWithNullCategories);

  // register the missing categories back to the masterlist
  for (const item of itemsWithNullCategories) {
    // find if there is existing category with the same category name
    // this is the case where user deletes a category but then adds it again
    const existingCategory = await prisma.category.findFirst({
      where: {
        userDataId: userId,
        category_name: item.categoryName,
      },
    });
    console.log("existingCategory", existingCategory);

    // if not existing category add it to masterlist
    if (existingCategory === null) {
      const addedCategory = await prisma.category.create({
        data: {
          category_name: item.categoryName,
          userDataId: userId,
        },
        select: { id: true, category_name: true, items: true },
      });
      console.log("addedCategory", addedCategory);

      // update listed item category
      const updatedListedItem = await prisma.listedItem.update({
        where: {
          id: item.id,
        },
        data: {
          categoryId: addedCategory.id,
          categoryName: addedCategory.category_name,
        },
      });
      console.log("updatedListedItem", updatedListedItem);
      if (!updatedListedItem) {
        throw new Error("Listed item not found.");
      }

      console.log("Push", addedCategory);
      addedCategories.push(addedCategory);
    } else {
      // update listed item to this category
      const updatedListedItem = await prisma.listedItem.update({
        where: {
          id: item.id,
        },
        data: {
          categoryId: existingCategory.id,
          categoryName: existingCategory.category_name,
        },
      });
      if (!updatedListedItem) {
        throw new Error("Listed item not found.");
      }
    }
  }

  // check if there are null master item IDs
  const itemsWithNullMasterItemIds = await prisma.listedItem.findMany({
    where: {
      listId: listId,
      masterItemId: null,
    },
  });

  // register the missing items back to the masterlist
  // find if there is existing masterlist item with the same item name
  // this is the case where user deletes a masterlist item but then adds it again
  for (const item of itemsWithNullMasterItemIds) {
    const existingItem = await prisma.item.findFirst({
      where: {
        item_name: item.listed_item_name,
        categoryId: item.categoryId,
      },
    });

    if (existingItem === null) {
      // add a non-existing item
      const addedItem = await prisma.item.create({
        data: {
          item_name: item.listed_item_name,
          quantity: 0,
          is_purchased: false,
          categoryId: item.categoryId,
        },
        select: {
          id: true,
          item_name: true,
          quantity: true,
          is_purchased: true,
        },
      });

      // update master item id column in the listed item
      const updatedListedItem = await prisma.listedItem.update({
        where: {
          id: item.id,
        },
        data: {
          masterItemId: addedItem.id,
        },
      });
      if (!updatedListedItem) {
        throw new Error("Listed item not found.");
      }

      addedItems.push(addedItem);
    } else {
      // update master item id in the listed item with the existing one in masterlist
      const updatedListedItem = await prisma.listedItem.update({
        where: {
          id: item.id,
        },
        data: {
          masterItemId: existingItem.id,
        },
      });
      if (!updatedListedItem) {
        throw new Error("Listed item not found.");
      }
    }
  }

  console.log("listInfo", listInfo);
  console.log("addedCategories", addedCategories);
  console.log("addedItems", addedItems);

  return {
    listInfo,
    addedCategories,
    addedItems,
  };
}
