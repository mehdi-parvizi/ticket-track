import { issueSchema } from "@/app/schema/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });
  return NextResponse.json(updatedIssue);
}
