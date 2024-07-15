import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { jsonContentId: string } }) {
  const jsonContentId = parseInt(params.jsonContentId);

  try {
    const jsonContent = await prisma.jsonContent.findUnique({
      where: {
        id: jsonContentId,
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
