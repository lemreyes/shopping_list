import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/logo.svg";
import list_icon from "../../../public/assets/list_icon.svg";
import replay_icon from "../../../public/assets/replay.svg";
import stats_icon from "../../../public/assets/stats.svg";
import cart_icon from "../../../public/assets/cart.svg";

export default function Navbar() {
  return (
    <nav className="flex flex-row desktop:flex-col justify-between desktop:justify-center w-screen desktop:h-screen desktop:min-h-screen desktop:max-w-fit fixed desktop:sticky bottom-0 left-0 desktop:top-0 px-4 py-2 desktop:p-0 bg-white border-t border-gray-400 desktop:border-none">
      <Image src={logo} alt="logo" className="w-10 desktop:mx-8 desktop:mt-8" />
      <div className="flex flex-row desktop:flex-col">
        <Image
          src={list_icon}
          alt="list_icon"
          className="w-10 mx-2 desktop:mx-8 desktop:my-8"
        />
        <Image
          src={replay_icon}
          alt="replay_icon"
          className="w-10 mx-2 desktop:mx-8 desktop:my-8"
        />
        <Image
          src={stats_icon}
          alt="stats_icon"
          className="w-10 mx-2 desktop:mx-8 desktop:my-8"
        />
      </div>
      <div className="rounded-full p-2 bg-slate-600 flex desktop:hidden items-center justify-center w-10 desktop:mx-8 desktop:mb-4">
        <Link href="#activeList"><Image src={cart_icon} alt="cart" className="" /></Link>
      </div>
    </nav>
  );
}
