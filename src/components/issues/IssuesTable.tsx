import { Status } from "@prisma/client";
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

async function getIssues() {
  const res = await fetch("http://localhost:3000/api/issues", {
    cache: "no-cache",
  });

  const issues = res.json();
  return issues;
}

type Issue = {
  id: number;
  title: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
};
async function IssuesTable() {
  const issues = await getIssues();
  console.log(issues);

  return (
    <div className="w-10/12">
      <Table>
        <TableCaption>A list of your recent issues.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold bg-black/5">Title</TableHead>
            <TableHead className="hidden sm:table-cell font-semibold bg-black/5">
              Status
            </TableHead>
            <TableHead className="hidden sm:table-cell font-semibold bg-black/5">
              {" "}
              Date Created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.data.map((issue: Issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block sm:hidden">{issue.status}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <IssueBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {issue.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
export default IssuesTable;
