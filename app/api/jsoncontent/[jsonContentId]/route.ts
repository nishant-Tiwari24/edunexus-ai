import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest, { params }: { params: { jsonContentId: string } }) {
  const jsonContentId = parseInt(params.jsonContentId);

  try {
    const existingSubtopics = await prisma.subtopics.findMany({
      where: {
        JsonId: jsonContentId,
      },
    });

    if (existingSubtopics.length > 0) {
      return NextResponse.json({ message: 'Subtopics already exist for this JsonContent' }, { status: 200 });
    }

    const jsonContent = await prisma.jsonContent.findUnique({
      where: {
        id: jsonContentId,
      },
    });

    if (!jsonContent) {
      return NextResponse.json({ message: 'JsonContent not found' }, { status: 404 });
    }

    const main = jsonContent.value;
    const prompt = `Generate 10 or more important subtopics for the topic "${main}" so I get to know completely about this topic in detail.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o",
    });

    const subtopicsText = completion.choices[0].message.content.trim();
    const subtopicsTitles = subtopicsText.split('\n').filter(line => line.length > 0);

    // Save the generated subtopics to the database
    const subtopicPromises = subtopicsTitles.map(title =>
      prisma.subtopics.create({
        data: {
          titles: title,
          JsonId: jsonContentId,
        },
      })
    );
    await Promise.all(subtopicPromises);

    return NextResponse.json({ message: 'Subtopics generated and saved successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to generate or save subtopics' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { jsonContentId: string } }) {
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
      return NextResponse.json({ message: 'JsonContent not found' }, { status: 404 });
    }

    return NextResponse.json(jsonContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to fetch JsonContent' }, { status: 500 });
  }
}
