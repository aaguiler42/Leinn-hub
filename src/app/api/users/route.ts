import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const API_KEY = process.env.USER_CLERK_API_KEY;

export async function POST(request: NextRequest) {
  const auth = request.headers.get("API-KEY");
  if (!API_KEY || auth !== API_KEY) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  if (!body) {
    return NextResponse.json(
      {
        message: "Missing body",
      },
      { status: 400 }
    );
  }

  const { clerkId, name, email, imageUrl } = await body;

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
      name,
      email,
      imageUrl
    },
  });

  return NextResponse.json(user, { status: 200 });
}
