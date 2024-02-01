// "use client";
import IssuesAction from "@/components/issues/IssuesAction";
import IssuesTable from "@/components/issues/IssuesTable";
import { Status } from "@prisma/client";
import { stat } from "fs";

type Props = {
  searchParams: {
    status: Status | "ALL";
  };
};
function Issues({ searchParams }: Props) {
  const status = searchParams.status;

  return (
    <div className="p-4 w-10/12 space-y-3 container  max-w-screen-2xl">
      <IssuesAction />
      <IssuesTable status={status} />
    </div>
  );
}
export default Issues;
