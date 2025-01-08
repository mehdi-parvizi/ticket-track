import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../schema/validationSchemas";
import { prisma } from "../../../../prisma/client";

interface Issue {
  title: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const body: Issue = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
