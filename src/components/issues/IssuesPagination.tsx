"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Status } from "@prisma/client";
import { Issue } from "./IssuesTable";

type Props = {
  itemCount: number;
  pageSize: number;
  currPage: number;
  status: Status | "ALL";
  sortBy: keyof Issue;
};
function IssuesPagination({
  currPage = 1,
  itemCount,
  pageSize,
  sortBy,
  status,
}: Props) {
  const pages = Math.ceil(itemCount / pageSize);

  const nextPage = () => {
    const page = Number(currPage);
    if (page >= pages) return pages;
    return page + 1;
  };
  const prevPage = () => {
    const page = Number(currPage);
    if (page <= 1) return 1;
    return page - 1;
  };

  if (pages <= 1)
    return (
      <Button
        className="p-1 rounded border text-black bg-white hover:bg-secondary"
        size={"sm"}
        disabled={Number(currPage) === 1}
      >
        <Link
          href={{ query: { page: prevPage(), status: status, sortBy: sortBy } }}
        >
          <ArrowLeft />
        </Link>
      </Button>
    );

  return (
    <div className="inline-flex items-center p-1 rounded bg-white space-x-2">
      <Button
        className="p-1 rounded border text-black bg-white hover:bg-secondary"
        size={"sm"}
        disabled={Number(currPage) === 1}
      >
        <Link
          href={{ query: { page: prevPage(), status: status, sortBy: sortBy } }}
        >
          <ArrowLeft />
        </Link>
      </Button>

      <p className="text-gray-500">
        Page {currPage} of {pages}
      </p>
      <Button
        className="p-1 rounded border text-black bg-white hover:bg-secondary"
        size={"sm"}
        disabled={Number(currPage) === pages}
      >
        <Link
          href={{ query: { page: nextPage(), status: status, sortBy: sortBy } }}
        >
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
export default IssuesPagination;
