import { Status } from "@prisma/client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import IssueBadge from "./IssueBadge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getIssues } from "@/app/actions/action";
import { ArrowDown } from "lucide-react";
import IssuesPagination from "./IssuesPagination";
import { SORTED_BY } from "@/lib/SortedByMap";
import { useSearchParams } from "next/navigation";

export type Issue = {
  id: number;
  title: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
};

type Props = {
  status: Status | "ALL";
  sortBy: keyof Issue;
  page: number;
};
async function IssuesTable({ status, sortBy, page }: Props) {
  const issues = await getIssues(status, sortBy, page);
  return (
    <div className="flex flex-col gap-5 items-center">
      <Table>
        <TableCaption>A list of your recent issues.</TableCaption>
        <TableHeader>
          <TableRow>
            {SORTED_BY.map(({ label, value, className }) => (
              <TableHead
                key={value}
                className={cn("font-semibold bg-black/5 w-10", className)}
              >
                {sortBy === value ? (
                  <div className="flex items-center gap-1">
                    <Link
                      href={{
                        query: {
                          status: status,
                          sortBy: value,
                        },
                      }}
                    >
                      {label}
                    </Link>
                    <ArrowDown width={20} />
                  </div>
                ) : (
                  <Link
                    href={{
                      query: {
                        status: status,
                        sortBy: value,
                      },
                    }}
                  >
                    {label}
                  </Link>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue: Issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block sm:hidden">{issue.status}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <IssueBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {format(issue.createdAt!, "dd/MM/yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <IssuesPagination take={0} skip={0} totalArticles={issues.length} /> */}
      <IssuesPagination
        itemCount={issues.length}
        pageSize={4}
        currPage={page}
        status={status}
        sortBy={sortBy}
      />
    </div>
  );
}
export default IssuesTable;
