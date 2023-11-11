import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "../../Utilities/prismaUtils";

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
  if (!userData) {
    return NextResponse.json(
      {
        errorMessage: "User not found.",
      },
      { status: 404 }
    );
  }

  const { categoryName }: { categoryName: string } = await request.json();
  if (categoryName.length <= 0) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters.",
      },
      { status: 400 }
    );
  }

  let category = await prisma.category.findFirst({
    where: {
      category_name: {
        equals: categoryName,
        mode: "insensitive",
      },
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

  return NextResponse.json({
    id: category.id,
    category_name: category.category_name,
    items: [],
  });
}
