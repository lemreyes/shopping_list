import Navbar from "../Components/Navbar";
import ListCard from "./Components/ListCard";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import prisma from "../Utilities/prismaUtils";
import { redirect } from "next/navigation";

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

  const lists = await prisma.list.findMany({
    where: {
      ownerId: userData?.id,
    },
  });
  console.log("lists", lists);

  return (
    <>
      <Navbar />
      <div className="flex justify-center pb-20">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mt-2 mb-4">Lists</h1>
          {lists.length > 0 ? (
            lists.map((list) => {
              return (
                <ListCard
                  key={list.id}
                  id={list.id}
                  list_name={list.list_name}
                  updated_at={list.updated_at}
                  is_done={list.is_done}
                  list_url={"localhost:3000/Lists/List1"}
                />
              );
            })
          ) : (
            <p>No lists found.</p>
          )}
        </div>
      </div>
    </>
  );
}
