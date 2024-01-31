import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const users = await prisma?.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!users) return Response.json({}, { status: 404 });

  return Response.json(users, { status: 201 });
}
