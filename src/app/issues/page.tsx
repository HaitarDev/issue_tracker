import IssuesAction from "@/components/issues/IssuesAction";
import IssuesTable from "@/components/issues/IssuesTable";
import { Button } from "@/components/ui/button";

import delay from "delay";
import Link from "next/link";

async function Issues() {
  await delay(2000);
  return (
    <div className="p-4 space-y-3 ">
      <IssuesAction />
      <IssuesTable />
    </div>
  );
}
export default Issues;
