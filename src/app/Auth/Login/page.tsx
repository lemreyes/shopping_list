"use client";

import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="grid grid-cols-3 w-full h-screen">
      <div
        id="splash"
        className="col-span-2 bg-login_bg bg-left-top bg-no-repeat bg-cover px-8 py-4 block"
      >
        <h1 className="text-5xl mb-8">
          Welcome to <span className="text-orange-600 font-bold">ShopSync</span>
        </h1>
        <section className="mt-8">
          <h2 className="text-xl font-bold">Shop Smarter, Together </h2>
          <p>
            ShopSync is your ultimate shopping companion. Say goodbye to the
            confusion of mismatched shopping lists and missed items. With
            ShopSync, you can effortlessly create, share, and update shopping
            lists in real-time with friends and family, ensuring that everyone
            stays on the same page.{" "}
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mt-8">Why Choose ShopSync?</h2>
          <ul className="list-disc">
            <li>
              <span className="font-bold">Real-time Syncing:</span> Stay
              connected with your shopping partners and see updates instantly as
              they add or check off items.
            </li>
            <li>
              <span className="font-bold">Collaborative Shopping:</span>{" "}
              Collaborate with friends, family, or roommates to create the
              perfect shopping list together.{" "}
            </li>
            <li>
              <span className="font-bold">Never Forget an Item:</span> With
              shared lists and automatic updates, you will never miss a thing on
              your grocery run.
            </li>
            <li>
              <span className="font-bold">Smart Organization:</span> Organize
              your lists by categories, making your shopping trip faster and
              more efficient.
            </li>
            <li>
              <span className="font-bold">Synchronize Anywhere:</span> Access
              your shopping lists on any device - your phone, tablet, or
              computer. ShopSync is with you wherever you go.
            </li>
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold">How It Works</h2>
          <ol className="list-decimal">
            <li>
              <span className="font-bold">Create Your List:</span> Start by
              creating a new shopping list. Add items quickly and easily.
            </li>
            <li>
              <span className="font-bold">Share with Friends:</span> Invite your
              shopping buddies to join your list with a simple click. No more
              phone calls or texts to coordinate.
            </li>
            <li>
              <span className="font-bold">Shop with Confidence:</span> As you
              and your friends shop, your lists are updated in real-time. No
              more duplicates or forgotten items.{" "}
            </li>
            <li>
              <span className="font-bold">Check Off Items:</span> Mark items as
              you pick them up, and everyone in your group will see the changes
              instantly.{" "}
            </li>
          </ol>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold">Join ShopSync Today</h2>
          <p>
            Shopping has never been this convenient and stress-free. Try
            ShopSync now and experience the future of collaborative shopping.
            Sign up today and say hello to smarter, synchronized shopping trips.
          </p>
        </section>
      </div>
      <div id="login" className="flex flex-col p-8">
        <h2 className="mb-4">Login</h2>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="w-full"
        />
        <button className="w-full mt-2 p-4 bg-gray-400 hover:bg-gray-100">
          Login with Email
        </button>
        <p className="my-4">or</p>
        <button
          className="w-full mt-2 p-4 bg-gray-400 hover:bg-gray-100"
          onClick={() => signIn("facebook")}
        >
          Login with Facebook
        </button>
        <button
          className="w-full mt-2 p-4 bg-gray-400 hover:bg-gray-100"
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
