import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

import prisma from "../../Utilities/prismaUtils";
import { TCategory, TItem } from "@/app/Types/Types";

export async function GET() {
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

  // populate masterlist with categories
  const categories: Array<TCategory> = await prisma.category.findMany({
    where: {
      userDataId: userData?.id,
    },
    select: {
      id: true,
      category_name: true,
      items: true,
    },
  });

  const newMasterList = await Promise.all(
    categories.map(async (category) => {
      const items: Array<TItem> = await prisma.item.findMany({
        where: {
          categoryId: category.id as number,
        },
        select: {
          id: true,
          item_name: true,
          quantity: true,
          is_purchased: true,
        },
      });
      category.items = items;
      return category;
    })
  );

  return NextResponse.json(newMasterList);
}
