import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateMegaQuestionsPrompt } from "@/lib/assessment-bot";

type MegaAssessment = {
  question: string;
  keyConcepts: string[];
  hints: string[];
  correctAnswers: string[];
  commonMistakes: string[];
  completed: boolean;
};

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const contentId = parseInt(url.pathname.split("/").pop() || "");

  if (isNaN(contentId)) {
    return NextResponse.json({ message: "Invalid contentId" }, { status: 400 });
  }

  try {
    const existingMegaQuestions = await prisma.megaQuestions.findFirst({
      where: { ContentId: contentId },
    });

    if (existingMegaQuestions) {
      return NextResponse.json(
        { megaQuestions: existingMegaQuestions },
        { status: 200 }
      );
    }

    const content = await prisma.content.findFirst({
      where: { id: contentId },
    });

    if (!content) {
      return NextResponse.json(
        { message: "Content not found" },
        { status: 404 }
      );
    }

    const responseContent = await generateMegaQuestionsPrompt(content.content);

    const jsonString = responseContent.substring(
      responseContent.indexOf("["),
      responseContent.lastIndexOf("]") + 1
    );
    const megaAssessment = JSON.parse(jsonString) as MegaAssessment[];

    const createdMegaQuestions = await prisma.megaQuestions.create({
      data: {
        megaAssessment: megaAssessment,
        ContentId: contentId,
      },
    });

    console.log({ megaQuestions: JSON.stringify(createdMegaQuestions) });
    return NextResponse.json({ megaQuestions: createdMegaQuestions });
  } catch (error) {
    console.error("Error generating or parsing mega questions:", error);
    return NextResponse.json(
      { message: "Error generating or parsing mega questions" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const contentId = parseInt(url.pathname.split("/").pop() || "");

    console.log("Fetching mega questions for ContentId:", contentId);

    if (isNaN(contentId)) {
      return NextResponse.json(
        { message: "Invalid contentId" },
        { status: 400 }
      );
    }

    const megaQuestions = await prisma.megaQuestions.findFirst({
      where: { ContentId: contentId },
    });

    if (!megaQuestions) {
      return NextResponse.json(
        { message: "No mega questions found for this contentId" },
        { status: 404 }
      );
    }

    return NextResponse.json(megaQuestions, { status: 200 });
  } catch (error) {
    console.error("Error fetching mega questions:", error);
    return NextResponse.json(
      { message: "Error fetching mega questions" },
      { status: 500 }
    );
  }
}
