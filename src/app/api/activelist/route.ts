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

  let activeList = await prisma.list.findFirst({
    where: {
      list_name: listName,
    },
  });
  console.log("activelist first check", activeList);
  if (!activeList) {
    activeList = await prisma.list.create({
      data: {
        list_name: listName,
        is_done: false,
        ownerId: userData?.id,
      },
    });
    console.log("Active list saved", activeList);

    if (activeList) {
      for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].items.length > 0) {
          for (let j = 0; j < shoppingList[i].items.length; j++) {
            const item = await prisma.listedItem.create({
              data: {
                listed_item_name: shoppingList[i].items[j].item_name,
                quantity: shoppingList[i].items[j].quantity,
                is_purchased: shoppingList[i].items[j].is_purchased,
                categoryId: shoppingList[i].id,
                listId: activeList.id,
                masterItemId: shoppingList[i].items[j].id,
              },
            });
          }
        }
      }
    }
  }

  return NextResponse.json({
    activeListId: activeList.id,
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
  for (let i = 0; i < shoppingList.length; i++) {}
}
