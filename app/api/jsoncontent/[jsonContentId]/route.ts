import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSubtopics } from "@/lib/json-content-bot";

interface JsonContentParams {
  jsonContentId: string;
}

interface Subtopic {
  titles: string;
  JsonId: number;
}

// Fetch existing subtopics by id
const getExistingSubtopics = async (
  jsonContentId: number
): Promise<Subtopic[]> => {
  return await prisma.subtopics.findMany({
    where: {
      JsonId: jsonContentId,
    },
  });
};

// Fetch JsonContent by id
const getJsonContentById = async (jsonContentId: number) => {
  return await prisma.jsonContent.findUnique({
    where: {
      id: jsonContentId,
    },
  });
};

// Create subtopics
const createSubtopics = async (
  subtopicsTitles: string[],
  jsonContentId: number
) => {
  const subtopicPromises = subtopicsTitles.map((title) =>
    prisma.subtopics.create({
      data: {
        titles: title,
        JsonId: jsonContentId,
      },
    })
  );
  await Promise.all(subtopicPromises);
};

// POST
export async function POST(
  req: NextRequest,
  { params }: { params: JsonContentParams }
) {
  const jsonContentId = parseInt(params.jsonContentId);

  if (isNaN(jsonContentId)) {
    return NextResponse.json(
      { message: "Invalid JsonContent ID" },
      { status: 400 }
    );
  }

  try {
    const existingSubtopics = await getExistingSubtopics(jsonContentId);

    if (existingSubtopics.length > 0) {
      return NextResponse.json(
        { message: "Subtopics already exist for this JsonContent" },
        { status: 200 }
      );
    }

    const jsonContent = await getJsonContentById(jsonContentId);

    if (!jsonContent) {
      return NextResponse.json(
        { message: "JsonContent not found" },
        { status: 404 }
      );
    }

    const subtopicsTitles = await generateSubtopics(jsonContent.value);

    await createSubtopics(subtopicsTitles, jsonContentId);

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

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: JsonContentParams }
) {
  const jsonContentId = parseInt(params.jsonContentId);

  if (isNaN(jsonContentId)) {
    return NextResponse.json(
      { message: "Invalid JsonContent ID" },
      { status: 400 }
    );
  }

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
