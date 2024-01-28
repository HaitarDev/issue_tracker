import { NextRequest } from "next/server";

import prisma from "@/prisma/client";

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
