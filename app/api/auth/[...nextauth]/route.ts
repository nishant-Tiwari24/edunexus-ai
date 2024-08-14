import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/authOptions";

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export const GET = handler;
export const POST = handler;
