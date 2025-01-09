import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../schema/validationSchemas";
import { prisma } from "../../../../prisma/client";
import { auth } from "@/app/auth";

interface Issue {
  title: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  const body: Issue = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
