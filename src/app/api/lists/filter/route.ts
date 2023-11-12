import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "@/app/Utilities/prismaUtils";

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

  const { filterNum } = await request.json();
  if (filterNum <= 0) {
    return NextResponse.json(
      {
        errorMessage: "Invalid parameters.",
      },
      { status: 400 }
    );
  }

  // update user data
  const userData = await prisma.userData.update({
    where: {
      email: session?.user?.email as string,
    },
    data: {
      listFilterOption: filterNum,
    },
  });
  if (!userData) {
    return NextResponse.json(
      {
        errorMessage: "User not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(userData);
}
