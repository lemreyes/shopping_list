import Navbar from "@/app/Components/Navbar";
import prisma from "../../../Utilities/prismaUtils";
import { ListedItem } from "@prisma/client";
import ListItem from "./Components/ListItem";

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
      <div className="flex justify-center pb-20">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mt-2 mb-4">{list?.list_name}</h1>
          <table className="w-full text-xl">
            <thead>
              <tr className="p-2">
                <th>Bought</th>
                <th>Item Name</th>
                <th>Qty.</th>
              </tr>
            </thead>
            {listItems.map((listItem) => {
              return (
                <ListItem
                  key={listItem.id}
                  id={listItem.id}
                  item_name={listItem.listed_item_name}
                  quantity={listItem.quantity}
                  is_purchased={listItem.is_purchased}
                />
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
