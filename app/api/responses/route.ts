import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface Roadmap {
  title: string;
  data: Record<string, string>;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "User unauthorized" });
  }

  const { syllabus, learningObj, refResources, prerequisites, duration } =
    await req.json();

  const prompt = `Generate a roadmap to learn the given subject, based on the information given below. The response should be structured into a JSON format with two keys: 'title' and 'data'. The 'title' key should have a value that is a detailed title generated for the roadmap. The 'data' key should contain a JSON object where the key is the name of the main topic and the value is a single string of subtopics under that main topic. Do not use any punctuation or markdown. The roadmap should be in the correct order and generate a minimum of 12 key-value pairs for data.

  Syllabus: ${syllabus || "N/A"}
  Learning Objectives: ${learningObj || "N/A"}
  Reference Resources: ${refResources || "N/A"}
  Prerequisites: ${prerequisites || "N/A"}
  Duration: ${duration || "N/A"}`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
    });

    const roadmap: Roadmap = JSON.parse(
      completion.choices[0]?.message?.content
    );

    const savedResponse = await prisma.chatGptResponse.create({
      data: {
        title: roadmap.title,
        userId: session.user.id,
      },
    });

    const jsonContentPromises = Object.entries(roadmap.data).map(
      ([key, value]) => {
        return prisma.jsonContent.create({
          data: {
            key,
            value,
            responseId: savedResponse.id,
          },
        });
      }
    );

    await Promise.all(jsonContentPromises);

    return NextResponse.json(savedResponse, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate and save response" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
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
    console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch responses" },
      { status: 500 }
    );
  }
}
