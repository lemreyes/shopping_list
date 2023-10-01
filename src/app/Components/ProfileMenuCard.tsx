import { signOut } from "next-auth/react";

export default function ProfileMenuCard() {
  return (
    <div className="absolute -top-16 desktop:top-20 right-0 bg-gray-200">
      <ul className="w-full">
        <li className="py-1 px-8 font-bold hover:bg-white border-b border-gray-300 w-full">
          Settings
        </li>
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
