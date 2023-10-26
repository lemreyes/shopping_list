import Navbar from "@/app/Components/Navbar";
import prisma from "@/app/Utilities/prismaUtils";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SettingsForm from "./Components/SettingsForm";
import { TUserData } from "@/app/Types/Types";
import { getThemeClassName } from "@/app/Utilities/ThemeUtils";
import { Themes } from "@/app/Types/Enums";

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

  const themeClassName = getThemeClassName(userData?.theme as Themes);

  return (
    <>
      <Navbar
        userDataId={userData?.id as number}
        userImage={userData?.image as string}
      />
      <div className="flex justify-center pb-20">
        <div className="w-4/5 desktop:w-1/3">
          <h1
            className={`${getThemeClassName(
              userData?.theme as Themes
            )} text-defaultColor text-3xl font-bold mt-2 mb-4`}
          >
            Settings
          </h1>
          <SettingsForm userData={userData as TUserData} />
        </div>
      </div>
    </>
  );
}
