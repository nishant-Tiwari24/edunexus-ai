import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

//@ts-ignore
const handler = (req: NextRequest, res: NextResponse) => NextAuth(req, res, authOptions);

export const GET = handler;
export const POST = handler;
