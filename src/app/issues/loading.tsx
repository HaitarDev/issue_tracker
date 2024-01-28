import IssuesAction from "@/components/issues/IssuesAction";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingIssues() {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div className="p-4 space-y-3">
      <IssuesAction />
      <Table className="w-10/12">
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
          {issues.map((issue) => (
            <TableRow key={issue}>
              <TableCell className="font-medium">
                <Skeleton />
                <div className="block sm:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default LoadingIssues;
