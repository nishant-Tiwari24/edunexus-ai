import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const contentId = parseInt(url.pathname.split("/").pop());

  if (isNaN(contentId)) {
    return NextResponse.json({ message: "Invalid contentId" }, { status: 400 });
  }

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
    return NextResponse.json({ message: "Content not found" }, { status: 404 });
  }

  const prompt = `You are an AI assistant tasked with creating a set of mega long questions for content: "${content.content}". 
  Please generate questions based on the following criteria and format:
  1. Key Concepts: Important concepts that this content covers in detail.
  2. Hints: Provide clues or hints for each question .
  3. Correct Answers: Include correct answers for each question in detail 100 words.
  4. Common Mistakes: List common mistakes students might make in detail 100 words.
  5. The JSON format should be as follows:
  {
    "megaAssessment": [
      {
        "question": "What is the time complexity of an algorithm that performs a binary search on a sorted array?",
        "keyConcepts": ["Binary Search", "Time Complexity", "Logarithmic Time"],
        "hints": ["Remember the logarithmic nature of the operation."],
        "correctAnswers": ["O(log n)"],
        "commonMistakes": ["Confusing with O(n log n)"],
        "completed": true
      }
    ]
  }`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o",
    });

    const responseContent = completion.choices[0].message.content;
    const jsonString = responseContent.substring(
      responseContent.indexOf("["),
      responseContent.lastIndexOf("]") + 1
    );
    const megaAssessment = JSON.parse(jsonString);

    const createdMegaQuestions = await prisma.megaQuestions.create({
      data: {
        megaAssessment: megaAssessment,
        ContentId: contentId,
      },
    });

    return NextResponse.json({ megaQuestions: createdMegaQuestions });
  } catch (error) {
    console.error("Error generating or parsing mega questions:", error);
    return NextResponse.json(
      { message: "Error generating or parsing mega questions" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { contentId: string } }
) {
  const contentId = parseInt(params.contentId);

  if (isNaN(contentId)) {
    return NextResponse.json({ message: "Invalid contentId" }, { status: 400 });
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
}
