import Link from "next/link";
import { Button } from "../ui/button";

function IssuesAction() {
  return (
    <>
      <h1 className="text-2xl font-semibold space-y-3">Issues</h1>
      <Button asChild>
        <Link href={"/newIssue"}> CREATE</Link>
      </Button>
    </>
  );
}
export default IssuesAction;
