import Navbar from "./Components/Navbar";
import { redirect } from "next/navigation";
import ControlPanel from "./Components/ControlPanel";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import prisma from "./Utilities/prismaUtils";
import {
  QueryProps,
  TCategory,
  TItem,
  TList,
  TShoppingListItem,
} from "./Types/Types";
import { Themes } from "./Types/Enums";

export default async function Home(props: QueryProps) {
  const { listId, ownerId } = props.searchParams;

  const session = await getServerSession(options);
  if (session === null) {
    redirect("/Auth/Login");
  }

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  // check user data matches with owner id
  if (ownerId !== undefined && parseInt(ownerId as string) !== userData?.id) {
    throw new Error("User ID mismatch.");
  }

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

  const masterList = await Promise.all(
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

  let shoppingListItems: Array<TShoppingListItem> = [];
  let listInfo = undefined;
  if (listId !== undefined) {
    // get list information
    listInfo = await prisma.list.findFirst({
      where: {
        id: parseInt(listId as string),
      },
      select: {
        id: true,
        list_name: true,
        is_done: true,
        ownerId: true,
        updated_at: true,
      },
    });
    if (listInfo === null) {
      throw Error("List not found.");
    }

    // get shooping list items
    shoppingListItems = await prisma.listedItem.findMany({
      where: {
        listId: parseInt(listId as string),
      },
      select: {
        id: true,
        quantity: true,
        is_purchased: true,
        listed_item_name: true,
        listId: true,
        categoryId: true,
        masterItemId: true,
      },
    });
  }

  return (
    <>
      <Navbar
        userDataId={userData?.id as number}
        userImage={userData?.image as string}
      />
      <ControlPanel
        masterList={masterList}
        editListInfo={listInfo as TList}
        editShoppingListItems={shoppingListItems}
        userId={parseInt(ownerId as string)}
        theme={userData?.theme as Themes}
      />
    </>
  );
}
