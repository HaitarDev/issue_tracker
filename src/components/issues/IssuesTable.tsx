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

export type Issue = {
  id: number;
  title: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
};
async function IssuesTable({
  status,
  sortBy,
}: {
  status: Status | "ALL";
  sortBy: keyof Issue;
}) {
  const issues = await getIssues(status, sortBy);

  const sortedBy: { label: string; value: keyof Issue; className?: string }[] =
    [
      { label: "Title", value: "title" },
      { label: "Status", value: "status", className: "hidden sm:table-cell " },
      {
        label: "Date Created",
        value: "createdAt",
        className: "hidden sm:table-cell",
      },
    ];

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent issues.</TableCaption>
        <TableHeader>
          <TableRow>
            {sortedBy.map(({ label, value, className }) => (
              <TableHead
                key={value}
                className={cn("font-semibold bg-black/5", className)}
              >
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
    </div>
  );
}
export default IssuesTable;
