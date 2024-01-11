import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

import prisma from "../../Utilities/prismaUtils";

interface PostRequestType {
  categoryName: string;
  itemName: string;
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
        errorMessage: "User not found.",
      },
      { status: 404 }
    );
  }

  const { categoryName, itemName }: PostRequestType = await request.json();

  let category = await prisma.category.findFirst({
    where: {
      category_name: {
        equals: categoryName,
        mode: "insensitive",
      },
      userDataId: userData.id,
    },
  });
  if (!category) {
    category = await prisma.category.create({
      data: {
        category_name: categoryName,
        userDataId: userData?.id,
      },
    });
    if (!category) {
      return NextResponse.json(
        {
          errorMessage:
            "Error in creating new category.  Please try again later.",
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        errorMessage:
          "Category is already existing.  Please add a category with a unique name.",
      },
      { status: 400 }
    );
  }

  let item = await prisma.item.findFirst({
    where: {
      item_name: {
        equals: itemName,
        mode: "insensitive",
      },
      userDataId: userData.id,
    },
  });
  if (!item) {
    item = await prisma.item.create({
      data: {
        item_name: itemName,
        categoryId: category.id,
        quantity: 0,
        is_purchased: false,
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
          "Error in adding item to database.  Please try again later.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    categoryId: item.categoryId,
    itemId: item.id,
  });
}
