import Link from "next/link";

export default function ListCopyResult({
  userDataId,
  listId,
  listName,
}: {
  userDataId: number;
  listId: number;
  listName: string;
}) {
  return (
    <div className="bg-orange-200 text-gray-900 text-sm mt-4 p-2 rounded-lg">
      <p>The duplicate list was successfully created.</p>
      <p>
        Please see it{" "}
        <Link
          href={{
            pathname: `/${userDataId}/Lists/${listName}`,
            query: {
              id: listId,
            },
          }}
        >
          here
        </Link>
        .
      </p>
    </div>
  );
}
