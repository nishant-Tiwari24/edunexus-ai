import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });
  }

  const { syllabus, learningObj, refResources, prerequisites, duration } = await req.json();

  try {
    const staticResponse = `This is a static roadmap:
      Syllabus: ${syllabus || "N/A"}
      Learning Objectives: ${learningObj || "N/A"}
      Reference Resources: ${refResources || "N/A"}
      Prerequisites: ${prerequisites || "N/A"}
      Duration: ${duration || "N/A"}`;

    const savedContent = await prisma.chatGptResponse.create({
      data: {
        content: staticResponse,
        userId: session.user.id,
      },
    });

    return NextResponse.json(savedContent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to generate and save response' }, { status: 500 });
  }
}
