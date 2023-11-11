import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prismaUtils";
import { Prisma } from "@prisma/client";

interface PutRequestType {
  listItemId: number;
  is_purchased: boolean;
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

  const { listId }: { listId: number } = await request.json();
  if (listId <= 0) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters.",
      },
      { status: 400 }
    );
  }

  try {
    const listItems = await prisma.listedItem.findMany({
      where: {
        listId: listId,
      },
    });

    return NextResponse.json(listItems);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            errorMessage: "No items found.",
          },
          { status: 404 }
        );
      }
    }
  }
}

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

  const { listItemId, is_purchased }: PutRequestType = await request.json();

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
            errorMessage: "The item to be updated was not found.",
          },
          { status: 404 }
        );
      }
    }
  }
}
