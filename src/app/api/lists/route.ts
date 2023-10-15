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
  console.log("DELETE listId", listId);

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
    console.log("DELETE deletedList", deletedList);

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
