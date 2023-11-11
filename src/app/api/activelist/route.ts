import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prismaUtils";
import { TShoppingListItem } from "@/app/Types/Types";

interface PostRequestType {
  listName: string;
  shoppingList: Array<TShoppingListItem>;
}

interface PatchRequestType extends PostRequestType {
  listId: number;
}

// create new list and store all items in DB
export async function POST(request: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized",
      },
      { status: 401 }
    );
  }

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!userData) {
    return NextResponse.json(
      {
        errorMessage: "User not found.",
      },
      { status: 404 }
    );
  }

  const { listName, shoppingList }: PostRequestType = await request.json();
  if (listName.length < 1 || shoppingList.length < 1) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters.",
      },
      { status: 400 }
    );
  }

  let activeList = await prisma.list.findFirst({
    where: {
      list_name: listName,
    },
  });

  if (!activeList) {
    activeList = await prisma.list.create({
      data: {
        list_name: listName,
        is_done: false,
        ownerId: userData?.id,
      },
    });

    // create each
    const savedShoppingList = await Promise.all(
      shoppingList.map(async (listItem: TShoppingListItem) => {
        const savedListItem = await prisma.listedItem.create({
          data: {
            listed_item_name: listItem.listed_item_name,
            quantity: listItem.quantity,
            is_purchased: false,
            categoryId: listItem.categoryId,
            categoryName: listItem.categoryName,
            listId: activeList?.id,
            masterItemId: listItem.masterItemId,
          },
        });

        return savedListItem;
      })
    );

    return NextResponse.json({
      activeListId: activeList.id,
      savedShoppingList: savedShoppingList,
    });
  }

  return NextResponse.json(
    {
      errorMessage: "This list already exists in database.",
    },
    { status: 400 }
  );
}

export async function PATCH(request: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized",
      },
      { status: 401 }
    );
  }

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!userData) {
    return NextResponse.json(
      {
        errorMessage: "User not found.",
      },
      { status: 404 }
    );
  }

  const { listId, listName, shoppingList }: PatchRequestType =
    await request.json();
  if (listId < 1 || listName.length < 1 || shoppingList.length < 1) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters.",
      },
      { status: 400 }
    );
  }

  // check if list is existing
  let targetUpdateList = await prisma.list.findUnique({
    where: {
      id: listId,
    },
  });
  if (!targetUpdateList) {
    return NextResponse.json(
      {
        errorMessage: "List not found.",
      },
      { status: 404 }
    );
  } else {
    // do nothing
  }

  targetUpdateList = await prisma.list.update({
    where: {
      id: listId,
    },
    data: {
      list_name: listName,
      updated_at: new Date(),
    },
  });

  // update list in database
  const updatedShoppingList = await Promise.all(
    shoppingList.map(async (listItem: TShoppingListItem) => {
      const updatedListItem = await prisma.listedItem.upsert({
        where: {
          id: listItem.id,
        },
        create: {
          listed_item_name: listItem.listed_item_name,
          quantity: listItem.quantity,
          is_purchased: listItem.is_purchased,
          masterItemId: listItem.masterItemId,
          listId: listId,
          categoryId: listItem.categoryId,
          categoryName: listItem.categoryName,
        },
        update: {
          listed_item_name: listItem.listed_item_name,
          quantity: listItem.quantity,
          is_purchased: listItem.is_purchased,
          updated_at: new Date(),
        },
      });

      return updatedListItem;
    })
  );

  const earliestUpdate = updatedShoppingList[0].updated_at;

  // delete items older than the earliest update
  const deletedItems = await prisma.listedItem.deleteMany({
    where: {
      listId: listId,
      updated_at: {
        lt: earliestUpdate,
      },
    },
  });

  return NextResponse.json({
    activeListId: listId,
    updatedShoppingList: updatedShoppingList,
    deletedItems: deletedItems,
  });
}
