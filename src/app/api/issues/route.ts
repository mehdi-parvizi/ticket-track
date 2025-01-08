import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "./schema";
import { prisma } from "../../../../prisma/client";

interface Issue {
  title: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const body: Issue = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
