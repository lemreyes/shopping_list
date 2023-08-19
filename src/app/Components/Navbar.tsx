import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import list_icon from "../../../public/assets/list_icon.svg";
import replay_icon from "../../../public/assets/replay.svg";
import stats_icon from "../../../public/assets/stats.svg";
import cart_icon from "../../../public/assets/cart.svg";

export default function Navbar() {
  return (
    <nav className="min-h-screen max-w-fit flex flex-col justify-between">
      <Image src={logo} alt="logo" className="mx-8 mt-8" />
      <div>
        <Image src={list_icon} alt="list_icon" className="mx-8 my-12" />
        <Image src={replay_icon} alt="replay_icon" className="mx-8 my-12" />
        <Image src={stats_icon} alt="stats_icon" className="mx-8 my-12" />
      </div>
      <div className="rounded-full p-4 bg-slate-600 flex items-center justify-center mx-4 mb-8">
        <Image src={cart_icon} alt="cart" className="" />
      </div>
    </nav>
  );
}
