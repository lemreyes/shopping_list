import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prisma";

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

  const { itemName, categoryId } = await request.json();

  let item = await prisma.item.findFirst({
    where: {
      item_name: {
        equals: itemName,
        mode: "insensitive",
      },
    },
  });
  if (!item) {
    item = await prisma.item.create({
      data: {
        item_name: itemName,
        quantity: 0,
        is_purchased: false,
        categoryId: categoryId,
      },
    });
    if (!item) {
      return NextResponse.json(
        {
          errorMessage:
            "Error in adding item to database.  Please try again later.",
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        errorMessage:
          "Item is already existing.  Please create new item with a different item name.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    id: item.id,
    item_name: item.item_name,
    quantity: 0,
    is_purchased: false,
  });
}
