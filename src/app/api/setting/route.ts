import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/app/Utilities/prismaUtils";
import fs from "fs";
import { TUserData } from "@/app/Types/Types";
import { Themes } from "@/app/Types/Enums";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const userDataId = parseInt(formData.get("id") as string);

  const userData = await prisma.userData.findUnique({
    where: {
      id: userDataId,
    },
  });
  if (!userData) {
    return NextResponse.json(
      {
        errorMessage: "User data not found",
      },
      { status: 404 }
    );
  }

  const userDataForUpdate: TUserData = {
    id: userData.id,
    email: userData.email,
    updated_at: new Date(),
    theme: userData.theme,
  };

  const name = formData.get("name");
  if (name) {
    userDataForUpdate.name = name as string;
  }

  const profile_image = formData.get("profile_image");
  if (profile_image) {
    const file = profile_image as Blob;
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`public/${file.name}`, buffer);

    userDataForUpdate.image = `${process.env.HOST_URL}/${file.name}`;
  }

  const theme = formData.get("theme");
  if (theme) {
    userDataForUpdate.theme = parseInt(theme as string);
  }

  // copy to updataData the data to be updated
  // use existing userData then overwrite with userDataForUpdate
  const updateData = { ...userData, ...userDataForUpdate };

  const updatedUserData = await prisma.userData.update({
    where: {
      id: userDataId,
    },
    data: updateData,
  });

  return NextResponse.json(updatedUserData);
}
