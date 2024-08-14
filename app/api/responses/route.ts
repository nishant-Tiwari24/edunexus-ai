import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { generateRoadmap } from "@/lib/response-bot";
//post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });
  }

  try {
    const { syllabus, learningObj, refResources, prerequisites, duration } =
      await req.json();

    const roadmap = await generateRoadmap(
      syllabus,
      learningObj,
      refResources,
      prerequisites,
      duration
    );

    const savedResponse = await prisma.chatGptResponse.create({
      data: {
        title: roadmap.title,
        userId: session.user.id,
      },
    });

    const jsonContentPromises = Object.entries(roadmap.data || {}).map(
      ([key, value]) => {
        return prisma.jsonContent.create({
          data: {
            key,
            value: String(value),
            responseId: savedResponse.id,
          },
        });
      }
    );

    await Promise.all(jsonContentPromises);

    return NextResponse.json(savedResponse, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/roadmap:", error);
    return NextResponse.json(
      { error: "Unable to generate and save response" },
      { status: 500 }
    );
  }
}
//get
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "User is not authenticated" },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const responseId = parseInt(url.searchParams.get("responseId") || "");

    if (responseId) {
      const response = await prisma.chatGptResponse.findFirst({
        where: {
          id: responseId,
          userId: session.user.id,
        },
        include: {
          jsonContents: true,
        },
      });

      if (!response) {
        return NextResponse.json(
          { message: "Response not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(response, { status: 200 });
    } else {
      const responses = await prisma.chatGptResponse.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          jsonContents: true,
        },
      });

      return NextResponse.json(responses, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET /api/roadmap:", error);
    return NextResponse.json(
      { error: "Unable to fetch responses" },
      { status: 500 }
    );
  }
}
