"use client";

import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";

export default function LoginPanel() {
  return (
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
  );
}
