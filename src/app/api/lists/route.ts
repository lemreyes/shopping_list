import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/app/Utilities/prismaUtils";
import { Prisma } from "@prisma/client";

interface PostRequestType {
  srcListId: number;
  destListName: string;
}

interface PatchRequestType {
  listId: number;
  archivedStatus: boolean;
}

export async function POST(request: NextRequest) {
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
        errorMessage: "User not found",
      },
      { status: 404 }
    );
  }

  const { srcListId, destListName }: PostRequestType = await request.json();
  if (srcListId <= 0 || destListName.length <= 0) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters",
      },
      { status: 400 }
    );
  }

  // validate source list id
  const srcList = await prisma.list.findUnique({
    where: {
      id: srcListId,
      ownerId: userData.id,
    },
  });
  if (!srcList) {
    return NextResponse.json(
      {
        errorMessage: "Source list was not found.",
      },
      { status: 404 }
    );
  }

  // validate destination list name
  const existingList = await prisma.list.findFirst({
    where: {
      ownerId: userData.id,
      list_name: destListName,
    },
  });
  if (existingList) {
    return NextResponse.json(
      {
        errorMessage: "An existing list with this name already exists.",
      },
      { status: 400 }
    );
  }

  // create the new list
  const newList = await prisma.list.create({
    data: {
      list_name: destListName,
      ownerId: userData.id,
      is_done: false,
    },
  });
  if (!newList) {
    return NextResponse.json(
      {
        errorMessage: "Error in list creation.  Please try again later.",
      },
      { status: 500 }
    );
  }

  // copy the existing list
  const itemsFromSrcList = await prisma.listedItem.findMany({
    where: {
      listId: srcListId,
    },
  });

  const itemsInCopyList = await Promise.all(
    itemsFromSrcList.map(async (srcListItem) => {
      const newListItem = await prisma.listedItem.create({
        data: {
          listed_item_name: srcListItem.listed_item_name,
          quantity: srcListItem.quantity,
          listId: newList.id,
          is_purchased: false,
          categoryId: srcListItem.categoryId,
          categoryName: srcListItem.categoryName,
          masterItemId: srcListItem.masterItemId,
          ownerId: userData.id,
        },
      });

      return newListItem;
    })
  );

  return NextResponse.json(newList);
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { listId }: { listId: number } = await request.json();
  if (listId <= 0) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters",
      },
      { status: 400 }
    );
  }

  try {
    // delete itemList contents of the list
    await prisma.listedItem.deleteMany({
      where: {
        listId: listId,
      },
    });

    const deletedList = await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    return NextResponse.json(deletedList);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            errorMessage: "The list to be deleted was not found.",
          },
          { status: 404 }
        );
      }
    }
  }
}

/**
 * Toggles the list is_done for archiving/reopening
 * @param request
 * @returns NextResponse
 */
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { listId, archivedStatus }: PatchRequestType = await request.json();
  if (listId <= 0) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters",
      },
      { status: 400 }
    );
  }

  const updatedList = await prisma.list.update({
    where: {
      id: listId,
    },
    data: {
      is_done: archivedStatus,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updatedList);
}
