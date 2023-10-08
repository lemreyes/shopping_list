import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prismaUtils";
import { Prisma } from "@prisma/client";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { listItemId, is_purchased } = await request.json();

  try {
    const listItem = await prisma.listedItem.update({
      where: {
        id: listItemId,
      },
      data: {
        is_purchased: is_purchased,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(listItem);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            errorMessage: "The item to be deleted was not found.",
          },
          { status: 404 }
        );
      }
    }
  }
}
