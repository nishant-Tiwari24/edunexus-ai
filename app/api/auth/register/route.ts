import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("Received data:", { email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'User already exists' }, { status: 500 });
  }
}
