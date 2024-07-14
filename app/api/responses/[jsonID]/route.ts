import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest, { params }) {
  const session = await getServerSession(authOptions);
  const roadmapId = parseInt(params.roadmapId);
  const jsonId = parseInt(params.jsonId);

  if (!session) {
    return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
  }

  try {
    const jsonContent = await prisma.jsonContent.findUnique({
      where: {
        id: jsonId,
        responseId: roadmapId,
      },
    });

    if (!jsonContent) {
      return NextResponse.json({ message: 'JSON content not found' }, { status: 404 });
    }

    return NextResponse.json(jsonContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to fetch JSON content' }, { status: 500 });
  }
}
