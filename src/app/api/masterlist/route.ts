import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
  const session = await getServerSession(options);
  console.log("session: ", session);

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  console.log("userData", userData);

  // populate masterlist with categories
  const categories: Array<Category> = await prisma.category.findMany({
    where: {
      userDataId: userData?.id,
    },
  });

  console.log("newMasterList", categories);

  const newMasterList = await Promise.all(
    categories.map(async (category) => {
      const items: Array<Item> = await prisma.item.findMany({
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
      console.log("Category", category, "Items", items);
      category.items = items;
      return category;
    })
  );
  console.log(newMasterList);

  return NextResponse.json({ masterList: newMasterList });
}
