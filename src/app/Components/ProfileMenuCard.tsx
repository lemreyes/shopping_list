import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileMenuCard({
  userDataId,
}: {
  userDataId: number;
}) {
  return (
    <div className="absolute -top-16 desktop:top-20 right-0 bg-gray-800">
      <ul className="w-full">
        <Link href={`/${userDataId}/Settings`}>
          <li className="py-1 px-8 font-bold hover:bg-white border-b border-gray-600 w-full">
            Settings
          </li>
        </Link>
        <li
          className="py-1 px-8 font-bold hover:bg-white"
          onClick={() => signOut()}
        >
          Signout
        </li>
      </ul>
    </div>
  );
}
