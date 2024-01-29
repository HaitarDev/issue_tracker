import IssuesAction from "@/components/issues/IssuesAction";
import IssuesTable from "@/components/issues/IssuesTable";

import delay from "delay";

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
