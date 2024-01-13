import { signIn } from "next-auth/react";

export default function DemoLogin() {
  const hdlLoginDemoOnclick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await signIn("guest", {
      callbackUrl: "/",
      username: "Guest",
    });
  };

  return (
    <div
      id="login"
      className="flex flex-col gap-y-2 border-t desktop:border-none w-full mb-8"
    >
      <button
        className="w-full mt-2 p-4 bg-green-600 text-white 
                   hover:border hover:border-green-600 hover:bg-white hover:text-green-600 font-bold"
        onClick={hdlLoginDemoOnclick}
      >
        Login as Guest
      </button>
      <p className="text-green-800 text-left">
        Login as guest to see the app&apos;s features.
      </p>
    </div>
  );
}
