import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import list_icon from "../../../public/list_icon.svg";
import replay_icon from "../../../public/replay.svg";
import stats_icon from "../../../public/stats.svg";
import cart_icon from "../../../public/cart.svg";

export default function Navbar() {
  return (
    <nav className="flex-col">
      <Image src={logo} alt="logo" />
      <div>
        <Image src={list_icon} alt="list_icon" />
        <Image src={replay_icon} alt="replay_icon" />
        <Image src={stats_icon} alt="stats_icon" />
      </div>
      <Image src={cart_icon} alt="cart" />
    </nav>
  );
}
