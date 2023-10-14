import Navbar from "./Components/Navbar";
import { redirect } from "next/navigation";
import ControlPanel from "./Components/ControlPanel";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import prisma from "./Utilities/prismaUtils";

export default async function Home() {
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

  const categories: Array<Category> = await prisma.category.findMany({
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
      category.items = items;
      return category;
    })
  );

  return (
    <>
      <Navbar
        userDataId={userData?.id as number}
        userImage={userData?.image as string}
      />
      <ControlPanel masterList={masterList} />
    </>
  );
}
