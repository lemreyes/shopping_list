import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prismaUtils";

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

  const { listName, shoppingList } = await request.json();

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
      shoppingList.map(async (listItem: ShoppingListItem) => {
        const savedListItem = await prisma.listedItem.create({
          data: {
            listed_item_name: listItem.listed_item_name,
            quantity: listItem.quantity,
            is_purchased: false,
            categoryId: listItem.categoryId,
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

  const { listId, shoppingList } = await request.json();

  // update list in database
  for (let i = 0; i < shoppingList.length; i++) {}
}
