import Link from "next/link";
import { Button } from "../ui/button";
import { SortByIssues } from "./SortByIssues";

function IssuesAction() {
  return (
    <>
      <h1 className="text-2xl font-semibold space-y-3">Issues</h1>
      <div className="flex justify-between">
        <Button asChild>
          <Link href={"/newIssue"}> CREATE</Link>
        </Button>
        <SortByIssues />
      </div>
    </>
  );
}
export default IssuesAction;
