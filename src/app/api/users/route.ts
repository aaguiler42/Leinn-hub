import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      {
        message: "Missing body",
      },
      { status: 400 }
    );
  }

  const { clerkId } = await body;

  if (!clerkId || typeof clerkId !== "string") {
    return NextResponse.json(
      {
        message: "Missing clerkId",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      clerkId,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
