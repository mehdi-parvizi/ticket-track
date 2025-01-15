import { patchIssueSchema } from "@/app/schema/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { Status } from "@prisma/client";
import { auth } from "@/app/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  const body = await req.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { id } = await params;
  const { assignedToUserId, title, description } = validation.data;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "invalid user id" }, { status: 400 });
  }
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({});
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  const { id } = await params;
  const body: { status: Status } = await req.json();
  let issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  issue = await prisma.issue.update({
    where: { id: issue.id },
    data: { status: body.status },
  });
  return NextResponse.json(issue);
}
