import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prisma";
import { NextApiResponse } from "next";

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

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const { categoryName } = await request.json();

  let category = await prisma.category.findFirst({
    where: {
      category_name: categoryName,
    },
  });
  if (!category) {
    category = await prisma.category.create({
      data: {
        category_name: categoryName,
        userDataId: userData?.id,
      },
    });
  } else {
    return NextResponse.json(
      {
        errorMessage: "Category is already existing.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    id: category.id,
    category_name: category.category_name,
    items: [],
  });
}
