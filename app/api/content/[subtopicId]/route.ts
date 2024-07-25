import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const subtopicId = parseInt(url.pathname.split('/').pop() || '');

  if (isNaN(subtopicId)) {
    return NextResponse.json({ message: 'Invalid subtopic ID' }, { status: 400 });
  }

  try {
    const subtopic = await prisma.subtopics.findUnique({
      where: {
        id: subtopicId,
      },
    });

    if (!subtopic) {
      return NextResponse.json({ message: 'Subtopic not found' }, { status: 404 });
    }

    const existingContent = await prisma.content.findFirst({
      where: {
        SubtopicId: subtopicId,
      },
    });

    const prompt = `You are an expert on  ${subtopic.titles}. Your job is to teach the given sub-topic: ${subtopic.titles} in extreme detail.
    1. Use an explanation that is elaborate and detailed but easy to understand.
    2. Use examples to explain the concept.
    3. If it is related to code, then include a code snippet to explain the concept.
    4. Start with an introduction paragraph, then go ahead with the explanation and end with a conclusion paragraph.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o",
    });

    const contentText = completion.choices[0].message.content.trim();

    if (existingContent) {
      await prisma.content.update({
        where: {
          id: existingContent.id,
        },
        data: {
          content: contentText,
        },
      });
    } else {
      await prisma.content.create({
        data: {
          SubtopicId: subtopicId,
          content: contentText,
        },
      });
    }

    return NextResponse.json({ message: 'Content generated and saved successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to generate or save content' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { subtopicId: string } }) {
  const subtopicId = parseInt(params.subtopicId);

  try {
    const content = await prisma.content.findMany({
      where: {
        SubtopicId: subtopicId,
      },
    });

    if (content.length === 0) {
      return NextResponse.json({ message: 'No content found for this subtopic' }, { status: 404 });
    }

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to fetch content' }, { status: 500 });
  }
}
