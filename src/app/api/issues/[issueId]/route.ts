import { NextRequest } from "next/server";

import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/AuthOptions";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const issue = await prisma?.issue.findUnique({
    where: {
      id: Number(params.issueId),
    },
  });

  if (!issue) return Response.json({ error: "No data found" }, { status: 404 });

  return Response.json(issue, { status: 201 });
}

export async function PATCH(req: NextRequest, context: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    Response.json({ error: "You must be logged in" }, { status: 401 });
  }
  const id = context.params.issueId;
  const newestIssue = await req.json();
  try {
    const currIssue = await prisma.issue.findUnique({
      where: { id: Number(id) },
    });

    if (!currIssue) {
      return Response.json({ error: "No data found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: Number(id) },
      data: newestIssue,
    });

    return Response.json(updatedIssue, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  const session = await getServerSession(authOptions);

  if (!session) {
    Response.json({ error: "You must be logged in" }, { status: 401 });
  }

  const currIssue = await prisma.issue.findUnique({
    where: { id: Number(params.issueId) },
  });

  if (!currIssue)
    return Response.json({ error: "No data found" }, { status: 404 });

  await prisma?.issue.delete({
    where: {
      id: Number(params.issueId),
    },
  });

  return Response.json("Success:  Issue deleted  ", { status: 201 });
}
