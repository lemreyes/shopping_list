import React from "react";
import Image from "next/image";
import Link from "next/link";

import profile_icon from "../../../public/assets/profile.svg";
import menu_icon from "../../../public/assets/menu_icon.svg";

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between fixed w-full bottom-0 desktop:static desktop:top-0 left-0 px-4 bg-gray-200">
      <div>
        <Image src={menu_icon} alt={menu_icon} className="w-8 mr-4 border border-gray-800 desktop:hidden" />
      </div>
      <div className="flex-grow py-2 text-3xl font-bold">
        Shop<span className="text-orange-600">Sync</span>
      </div>
      <div className="flex flex-row items-center">
        <Link
          href={""}
          className="p-8 font-bold hover:bg-white hidden desktop:inline"
        >
          Plan
        </Link>
        <Link
          href={""}
          className="p-8 font-bold hover:bg-white hidden desktop:inline"
        >
          Lists
        </Link>
        <Link
          href={""}
          className="p-8 font-bold hover:bg-white hidden desktop:inline"
        >
          Shop
        </Link>
        <div className="ml-8">
          <Image
            src={profile_icon}
            alt="profile picture"
            className="w-8 border border-gray-800 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
}
