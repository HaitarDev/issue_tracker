"use server";

import { Status } from "@prisma/client";
import prisma from "../../../prisma/client";
import { Issue } from "@/components/issues/IssuesTable";

export async function getIssues(
  status: Status | "ALL",
  sortBy: keyof Issue,
  page: Number
) {
  // validate status
  const statusArr = Object.keys(Status);
  const filteredStatus = statusArr.includes(status!) ? status : undefined;
  // validate sortBy
  let filteredSortBy;
  const sortByArr = ["title", "status", "createdAt"];
  filteredSortBy = sortByArr.includes(sortBy) ? sortBy : undefined;
  filteredSortBy = filteredSortBy ? filteredSortBy : "createdAt";

  // Pagination
  const pageSize = 5;
  const currPage = Number(page) || 1;

  const data = await prisma.issue.findMany({
    where: { status: filteredStatus! },
    orderBy: {
      [filteredSortBy]: "asc",
    },
    skip: (currPage - 1) * pageSize,
    take: pageSize,
  });

  return data;
}
