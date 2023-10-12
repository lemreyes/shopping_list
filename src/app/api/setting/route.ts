import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/app/Utilities/prismaUtils";
import fs from "fs";

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
  console.log("formData", formData);

  const userDataId = parseInt(formData.get("id") as string);
  console.log(userDataId);

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

  const userDataForUpdate: IUserData = {
    id: userData.id,
    email: userData.email,
  };

  const name = formData.get("name");
  console.log(name);
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

  const updateData = { ...userData, ...userDataForUpdate };
  console.log("updateData", updateData);

  const updatedUserData = await prisma.userData.update({
    where: {
      id: userDataId,
    },
    data: updateData,
  });

  return NextResponse.json(updatedUserData);
}