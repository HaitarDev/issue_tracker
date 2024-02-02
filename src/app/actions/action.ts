"use server";

import { Status } from "@prisma/client";
import prisma from "../../../prisma/client";
import { Issue } from "@/components/issues/IssuesTable";

export async function getIssues(status: Status | "ALL", sortBy: keyof Issue) {
  // validate status
  const statusArr = Object.keys(Status);
  const filteredStatus = statusArr.includes(status!) ? status : undefined;
  // validate sortBy
  let filteredSortBy;
  const sortByArr = ["title", "status", "createdAt"];
  filteredSortBy = sortByArr.includes(sortBy) ? sortBy : undefined;
  filteredSortBy = filteredSortBy ? filteredSortBy : "createdAt";
  console.log(filteredSortBy);

  const data = await prisma.issue.findMany({
    where: { status: filteredStatus! },
    orderBy: {
      [filteredSortBy]: "asc",
    },
  });

  return data;
}
