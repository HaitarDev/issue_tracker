import prisma from "../../../../prisma/client";
import { createIssueSchema } from "@/schema/createIssueSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const validation = createIssueSchema.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(req: NextRequest) {
  const data = await prisma.issue.findMany();

  if (!data) return Response.json({ error: "No data found" }, { status: 404 });

  return Response.json({ data: data }, { status: 200 });
}
