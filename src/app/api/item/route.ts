import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const { itemName, categoryId } = await request.json();

  const item = await prisma.item.create({
    data: {
      item_name: itemName,
      quantity: 0,
      is_purchased: false,
      categoryId: categoryId,
    },
  });

  return NextResponse.json({
    id: item.id,
    item_name: item.item_name,
    quantity: 0,
    is_purchased: false,
  });
}
