import Navbar from "@/app/Components/Navbar";
import prisma from "../../../Utilities/prismaUtils";
import { ListedItem } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ListItemContainer from "./Components/ListItemContainer";
import { QueryProps, TShoppingListItem } from "@/app/Types/Types";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import { Themes } from "@/app/Types/Enums";
import ListPanel from "./Components/ListPanel";
import ListHeading from "./Components/ListHeading";

export default async function List(props: QueryProps) {
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

  const list = await prisma.list.findUnique({
    where: {
      id: parseInt(props.searchParams.id as string),
      ownerId: userData?.id,
    },
  });
  if (!list) {
    // TODO: error handling
  }

  const listItems: Array<ListedItem> = await prisma.listedItem.findMany({
    where: {
      listId: parseInt(props.searchParams.id as string),
    },
    orderBy: [
      {
        is_purchased: "asc",
      },
      {
        listed_item_name: "asc",
      },
    ],
  });

  const themeClassName = getThemeClassName(userData?.theme as Themes);

  return (
    <>
      <Navbar
        userDataId={userData?.id as number}
        userImage={userData?.image as string}
      />
      <div className="flex justify-center pb-20">
        <div className="w-5/6 desktop:w-1/3">
          <ListHeading
            listId={list?.id as number}
            ownerId={list?.ownerId as number}
            listName={list?.list_name as string}
            themeClassName={themeClassName}
          />
          {list?.is_done && (
            <div className={`${themeClassName} text-gray-900 bg-gray-300 p-4`}>
              <p>{"This list is archived."}</p>
            </div>
          )}
          <ListItemContainer
            listItems={listItems as Array<TShoppingListItem>}
            isArchived={list?.is_done as boolean}
            theme={userData?.theme as Themes}
          />
          <ListPanel
            userId={userData?.id as number}
            listId={parseInt(props.searchParams.id as string)}
            isArchived={list?.is_done as boolean}
            theme={userData?.theme as Themes}
          />
        </div>
      </div>
    </>
  );
}
