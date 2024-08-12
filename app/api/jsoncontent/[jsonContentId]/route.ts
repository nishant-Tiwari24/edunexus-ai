import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(
  req: NextRequest,
  { params }: { params: { jsonContentId: string } }
) {
  const jsonContentId = parseInt(params.jsonContentId);

  try {
    const existingSubtopics = await prisma.subtopics.findMany({
      where: {
        JsonId: jsonContentId,
      },
    });

    if (existingSubtopics.length > 0) {
      return NextResponse.json(
        { message: "Subtopics already exist for this JsonContent" },
        { status: 200 }
      );
    }

    const jsonContent = await prisma.jsonContent.findUnique({
      where: {
        id: jsonContentId,
      },
    });

    if (!jsonContent) {
      return NextResponse.json(
        { message: "JsonContent not found" },
        { status: 404 }
      );
    }

    const main = jsonContent.value;
    const prompt = `Generate 15 in the sequential order starting from 1 to 15 , which will cover all the knowledge about topic ${main} so I get to know completely about this topic in detail. i want  Just the main topic of 6-7 words. just the topics no extra words. and it is not in a sequential order. in place of numbers like 1, 2, 3 give a emoji. dont give anything else other then the response i asked for. just the response. not anything else`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
    });

    const subtopicsText = completion.choices[0].message.content.trim();
    const subtopicsTitles = subtopicsText
      .split("\n")
      .filter((line) => line.length > 0);

    const subtopicPromises = subtopicsTitles.map((title) =>
      prisma.subtopics.create({
        data: {
          titles: title,
          JsonId: jsonContentId,
        },
      })
    );
    await Promise.all(subtopicPromises);

    return NextResponse.json(
      { message: "Subtopics generated and saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate or save subtopics" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { jsonContentId: string } }
) {
  const jsonContentId = parseInt(params.jsonContentId);

  try {
    const jsonContent = await prisma.jsonContent.findUnique({
      where: {
        id: jsonContentId,
      },
      include: {
        subtopics: true,
      },
    });

    if (!jsonContent) {
      return NextResponse.json(
        { message: "JsonContent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(jsonContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch JsonContent" },
      { status: 500 }
    );
  }
}
