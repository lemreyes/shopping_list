import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(options);

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const { categoryName } = await request.json();

  const category = await prisma.category.create({
    data: {
      category_name: categoryName,
      userDataId: userData?.id,
    },
  });

  return NextResponse.json({
    id: category.id,
    category_name: category.category_name,
    items: [],
  });
}
