"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import profile_icon from "../../../public/assets/profile.svg";
import menu_icon from "../../../public/assets/menu_icon.svg";
import MenuCard from "./MenuCard";
import ProfileMenuCard from "./ProfileMenuCard";

export default function Navbar({
  userDataId,
  userImage,
}: {
  userDataId: number;
  userImage: string;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const hdlMenuClick = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  const hdlProfileClick = () => {
    if (showProfileMenu) {
      setShowProfileMenu(false);
    } else {
      setShowProfileMenu(true);
    }
  };

  return (
    <nav className="flex flex-row items-center justify-between fixed w-full bottom-0 desktop:static desktop:top-0 left-0 px-4 bg-gray-200">
      <div>
        <Image
          src={menu_icon}
          alt={menu_icon}
          className="w-8 mr-4 border border-gray-800 desktop:hidden"
          onClick={hdlMenuClick}
        />
        {showMenu && <MenuCard userDataId={userDataId} />}
      </div>
      <div className="flex-grow py-2 text-3xl font-bold">
        Shop<span className="text-orange-600">Sync</span>
      </div>
      <div className="flex flex-row items-center">
        <Link
          href={"/"}
          className="p-8 font-bold hover:bg-white hidden desktop:inline"
        >
          Plan
        </Link>
        <Link
          href={`/${userDataId}/Lists`}
          className="p-8 font-bold hover:bg-white hidden desktop:inline"
        >
          Lists
        </Link>
        <div className="ml-8">
          <Image
            src={
              userImage.length > 0 && userImage != null
                ? userImage
                : profile_icon
            }
            alt="profile picture"
            className="w-8 h-8 overflow-hidden border border-gray-800 rounded-full"
            onClick={hdlProfileClick}
            width={36}
            height={36}
          />
          {showProfileMenu && <ProfileMenuCard userDataId={userDataId} />}
        </div>
      </div>
    </nav>
  );
}
