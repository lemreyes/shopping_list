import Link from "next/link";

export default function MenuCard({ userDataId }: { userDataId: number }) {
  return (
    <div className="absolute -top-16 -left-0 bg-gray-800 text-white">
      <ul>
        <Link href={"/"}>
          <li className="py-1 px-8 font-bold hover:bg-white hover:text-gray-800 border-b border-gray-600 w-full">
            Plan
          </li>
        </Link>
        <Link href={`/${userDataId}/Lists`}>
          <li className="py-1 px-8 font-bold hover:bg-white hover:text-gray-800 border-b border-gray-600 w-full">
            Lists
          </li>
        </Link>
      </ul>
    </div>
  );
}
