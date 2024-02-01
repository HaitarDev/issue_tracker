import IssuesAction from "@/components/issues/IssuesAction";
import IssuesTable from "@/components/issues/IssuesTable";

async function Issues() {
  return (
    <div className="p-4 w-10/12 space-y-3 container  max-w-screen-2xl">
      <IssuesAction />
      <IssuesTable />
    </div>
  );
}
export default Issues;
