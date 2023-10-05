import Navbar from "@/app/Components/Navbar";
import prisma from "../../../Utilities/prismaUtils";
import { ListedItem } from "@prisma/client";

export default async function List(props: Props) {
  const list = await prisma.list.findUnique({
    where: {
      id: parseInt(props.searchParams.id as string),
    },
  });

  const listItems: Array<ListedItem> = await prisma.listedItem.findMany({
    where: {
      listId: parseInt(props.searchParams.id as string),
    },
    orderBy: {
      categoryId: "asc",
    },
  });

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mt-2 mb-4">{list?.list_name}</h1>
    </>
  );
}
