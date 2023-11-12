import Navbar from "../../Components/Navbar";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import prisma from "../../Utilities/prismaUtils";
import { redirect } from "next/navigation";
import List from "./Components/List";
import { TList } from "@/app/Types/Types";
import { Themes } from "@/app/Types/Enums";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import { convNumberToFilterOptionObject } from "@/app/Utilities/clientUtils/listFilterOptionUtils";

export default async function Lists() {
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

  const listFilterOptionsObj = convNumberToFilterOptionObject(
    userData?.listFilterOption as number
  );

  let lists: Array<TList> = [];
  if (listFilterOptionsObj.archived && listFilterOptionsObj.open) {
    lists = await prisma.list.findMany({
      where: {
        ownerId: userData?.id,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        list_name: true,
        is_done: true,
        ownerId: true,
        updated_at: true,
      },
    });
  } else if (listFilterOptionsObj.archived) {
    lists = await prisma.list.findMany({
      where: {
        ownerId: userData?.id,
        is_done: true,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        list_name: true,
        is_done: true,
        ownerId: true,
        updated_at: true,
      },
    });
  } else if (listFilterOptionsObj.open) {
    lists = await prisma.list.findMany({
      where: {
        ownerId: userData?.id,
        is_done: false,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        list_name: true,
        is_done: true,
        ownerId: true,
        updated_at: true,
      },
    });
  }

  const themeClassName = getThemeClassName(userData?.theme as Themes);

  return (
    <>
      <Navbar
        userDataId={userData?.id as number}
        userImage={userData?.image as string}
      />
      <div className="flex justify-center pb-20">
        <div className="w-4/5">
          <h1
            className={`${themeClassName} text-defaultColor text-3xl font-bold mt-2 mb-4`}
          >
            Lists
          </h1>
          <List
            list_items={lists as Array<TList>}
            userId={userData?.id as number}
            theme={userData?.theme as Themes}
            filterOptionsFromDb={userData?.listFilterOption as number}
          />
        </div>
      </div>
    </>
  );
}
