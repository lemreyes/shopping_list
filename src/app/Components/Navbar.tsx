import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import list_icon from "../../../public/list_icon.svg";
import replay_icon from "../../../public/replay.svg";
import stats_icon from "../../../public/stats.svg";
import cart_icon from "../../../public/cart.svg";

export default function Navbar() {
  return (
    <nav className="min-h-screen max-w-fit flex flex-col justify-between">
      <Image src={logo} alt="logo" className="mx-4 mt-8" />
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
