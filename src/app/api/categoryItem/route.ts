import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

import prisma from "../../Utilities/prisma"

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const { categoryName, itemName } = await request.json();

  const category = await prisma.category.create({
    data: {
      category_name: categoryName,
      userDataId: userData?.id,
    },
  });
  console.log("Category", category);

  const item = await prisma.item.create({
    data: {
      item_name: itemName,
      categoryId: category.id,
      quantity: 0,
      is_purchased: false,
    },
  });
  console.log("Item", item);

  return NextResponse.json({
    categoryId: item.categoryId,
    itemId: item.id,
  });
}
