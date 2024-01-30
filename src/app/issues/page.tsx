import IssuesAction from "@/components/issues/IssuesAction";
import IssuesTable from "@/components/issues/IssuesTable";

async function Issues() {
  return (
    <div className="p-4 space-y-3 ">
      <IssuesAction />
      <IssuesTable />
    </div>
  );
}
export default Issues;
