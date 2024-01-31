import { NextRequest } from "next/server";

import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/AuthOptions";
import { patchIssueSchema } from "@/schema/createIssueSchema";

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
  // check if authenticated
  const session = await getServerSession(authOptions);

  if (!session) {
    Response.json({ error: "You must be logged in" }, { status: 401 });
  }

  const id = context.params.issueId;
  const body = await req.json();
  const { title, description, userId } = body;

  // check if body is validate
  const validate = patchIssueSchema.safeParse(body);
  if (!validate.success) {
    return Response.json({ error: validate.error.errors }, { status: 400 });
  }

  try {
    // check if there is issue : update issue
    const currIssue = await prisma.issue.findUnique({
      where: { id: Number(id) },
    });

    // if no issue send error
    if (!currIssue) {
      return Response.json({ error: "No data found (issue)" }, { status: 404 });
    }

    // now if there is a userId on the body, check if there is a user with this id ,
    // if no user return userid to null , if user return userid
    if (userId) {
      const currUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!currUser) {
        const updatedIssue = await prisma.issue.update({
          where: { id: Number(id) },
          data: {
            title,
            description,
            userId: null,
          },
        });

        return Response.json(updatedIssue, { status: 201 });
      }
    }

    // then update
    const updatedIssue = await prisma.issue.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        userId: userId,
      },
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
