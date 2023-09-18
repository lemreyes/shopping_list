"use client";

import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPanel() {
  const searchParams = useSearchParams();
  let errorMessage = "";

  const errorResult = searchParams.get("error");
  if (errorResult != null) {
    switch (errorResult) {
      case "EmailSignin":
        errorMessage =
          "Error in logging in using email.  Check the email address or try another login method";
        break;
      case "OAuthAccountNotLinked":
        errorMessage =
          "Email on this account is already linked, but not with this account.  Try signing in with another account.";
        break;
      default:
        errorMessage = "There was a problem logging in.";
    }
  }

  return (
    <div
      id="login"
      className="flex flex-col items-center p-8 border-t desktop:border-none"
    >
      <h2 className="mb-4">Login</h2>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        className="w-full"
      />
      <button
        className="w-full mt-2 p-4 bg-gray-400 hover:bg-gray-100"
        onClick={() => signIn("email", { callbackUrl: "/" })}
      >
        Login with Email
      </button>
      <p className="my-4">or</p>
      <button
        className="w-full mt-2 p-4 bg-gray-400 hover:bg-gray-100"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
      >
        Login with Facebook
      </button>
      <button
        className="w-full mt-2 p-4 bg-gray-400 hover:bg-gray-100"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Login with Google
      </button>
      {errorMessage !== "" && (
        <div className="mt-4 border border-red-800 bg-red-200 text-red-950 p-8">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
