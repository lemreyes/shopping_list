import Navbar from "@/app/Components/Navbar";
import prisma from "../../../Utilities/prismaUtils";
import { ListedItem } from "@prisma/client";
import ListItem from "./Components/ListItem";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function List(props: Props) {
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

  return (
    <>
      <Navbar userImage={userData?.image as string} />
      <div className="flex justify-center pb-20">
        <div className="w-4/5 desktop:w-1/3">
          <h1 className="text-3xl font-bold mt-2 mb-4">{list?.list_name}</h1>
          <ul>
            {listItems.length > 0 ? (
              listItems.map((listItem) => {
                return (
                  <ListItem
                    key={listItem.id}
                    id={listItem.id}
                    item_name={listItem.listed_item_name}
                    quantity={listItem.quantity}
                    is_purchased={listItem.is_purchased}
                  />
                );
              })
            ) : (
              <p>No items found.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
