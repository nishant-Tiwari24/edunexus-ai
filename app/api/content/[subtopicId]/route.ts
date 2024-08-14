import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateContent } from "@/lib/content-bot";

interface Subtopic {
  id: number;
  titles: string;
}

interface Content {
  id: number;
  SubtopicId: number;
  content: string;
}

// to get subtopic by ID
const getSubtopicById = async (
  subtopicId: number
): Promise<Subtopic | null> => {
  return await prisma.subtopics.findUnique({
    where: {
      id: subtopicId,
    },
  });
};

// to get content by subtopic ID
const getContentBySubtopicId = async (
  subtopicId: number
): Promise<Content | null> => {
  return await prisma.content.findFirst({
    where: {
      SubtopicId: subtopicId,
    },
  });
};

// to create content
const createContent = async (
  subtopicId: number,
  contentText: string
): Promise<Content> => {
  return await prisma.content.create({
    data: {
      SubtopicId: subtopicId,
      content: contentText,
    },
  });
};

// POST
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const subtopicId = parseInt(url.pathname.split("/").pop() || "");

  if (isNaN(subtopicId)) {
    return NextResponse.json(
      { message: "Invalid subtopic ID" },
      { status: 400 }
    );
  }

  try {
    const subtopic = await getSubtopicById(subtopicId);

    if (!subtopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    const existingContent = await getContentBySubtopicId(subtopicId);

    if (existingContent && existingContent.content.trim() !== "") {
      return NextResponse.json(
        { message: "Content already exists" },
        { status: 200 }
      );
    }

    const contentText = await generateContent(subtopic.titles);

    await createContent(subtopicId, contentText);

    return NextResponse.json(
      { message: "Content generated and saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate or save content" },
      { status: 500 }
    );
  }
}

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: { subtopicId: string } }
) {
  const subtopicId = parseInt(params.subtopicId);

  if (isNaN(subtopicId)) {
    return NextResponse.json(
      { message: "Invalid subtopic ID" },
      { status: 400 }
    );
  }

  try {
    const content = await prisma.content.findMany({
      where: {
        SubtopicId: subtopicId,
      },
    });

    if (content.length === 0) {
      return NextResponse.json(
        { message: "No content found for this subtopic" },
        { status: 404 }
      );
    }

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch content" },
      { status: 500 }
    );
  }
}
