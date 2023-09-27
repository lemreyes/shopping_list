import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prisma";

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
  console.log("Session: ", session);

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  console.log("userData: ", userData);

  const { listName, shoppingList } = await request.json();
  console.log("Body", listName, shoppingList);

  let activeListandItems = await prisma.list.findFirst({
    where: {
      list_name: listName,
    },
  });
  console.log("activelist first check", activeListandItems);

  const listedItems = [];
  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i].items.length > 0) {
      for (let j = 0; j < shoppingList[i].items.length; j++) {
        const listedItem = {
          listed_item_name: shoppingList[i].items[j].item_name,
          quantity: shoppingList[i].items[j].quantity,
          is_purchased: shoppingList[i].items[j].is_purchased,
          categoryId: shoppingList[i].id,
        };
        listedItems.push(listedItem);
      }
    }
  }
  console.log("Listed items: ", listedItems);

  if (!activeListandItems) {
    activeListandItems = await prisma.list.create({
      data: {
        list_name: listName,
        is_done: false,
        ownerId: userData?.id,
        listedItems: {
          create: listedItems,
        },
      },
    });
    console.log("Active list and items saved", activeListandItems);
  } else {
    return NextResponse.json(
      {
        errorMessage:
          "A list with the same name already exists.  Please rename the list that you would like to save.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    activeListId: activeListandItems.id,
  });
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
  console.log("Session: ", session);

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  console.log("userData: ", userData);

  const { listId, shoppingList } = await request.json();

  // update list in database
}
