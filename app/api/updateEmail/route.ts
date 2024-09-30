import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id: studentID, email: newEmail } = await req.json();
    await prisma.student.update({
      where: {
        id: studentID,
      },
      data: {
        email: newEmail,
      },
    });
    return NextResponse.json(
      { message: "Email updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating email" },
      { status: 500 }
    );
  }
}
