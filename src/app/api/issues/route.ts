import authOptions from "@/lib/AuthOptions";
import prisma from "../../../../prisma/client";
import { createIssueSchema } from "@/schema/createIssueSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { Status } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    Response.json({ error: "You must be logged in" }, { status: 401 });
  }
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
  const status = req.nextUrl.searchParams.get("status");
  const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
  console.log(sortBy);

  const statusArr = Object.keys(Status);

  const filteredStatus = statusArr.includes(status!) ? status : undefined;

  const data = await prisma.issue.findMany({
    where: { status: filteredStatus! },
    orderBy: {
      [sortBy!]: "asc",
    },
  });

  if (!data) return Response.json({ error: "No data found" }, { status: 404 });

  return Response.json({ data: data }, { status: 200 });
}
