import Navbar from "@/app/Components/Navbar";
import prisma from "@/app/Utilities/prismaUtils";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SettingsForm from "./Components/SettingsForm";

export default async function Settings() {
  const session = await getServerSession(options);
  if (session === null) {
    redirect("/Auth/Login");
  }

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return (
    <>
      <Navbar
        userDataId={userData?.id as number}
        userImage={userData?.image as string}
      />
      <div className="flex justify-center pb-20">
        <div className="w-4/5 desktop:w-1/3">
          <h1 className="text-3xl font-bold mt-2 mb-4">Settings</h1>
          <SettingsForm />
        </div>
      </div>
    </>
  );
}
