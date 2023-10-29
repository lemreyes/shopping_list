import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/app/Utilities/prismaUtils";
import { Prisma } from "@prisma/client";

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

  const { listId } = await request.json();

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

  const { listId, archivedStatus } = await request.json();

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
