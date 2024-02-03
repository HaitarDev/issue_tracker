// "use client";
import IssuesAction from "@/components/issues/IssuesAction";

import IssuesTable, { Issue } from "@/components/issues/IssuesTable";
import { Status } from "@prisma/client";

type Props = {
  searchParams: {
    status: Status | "ALL";
    sortBy: keyof Issue;
    page: number;
  };
};
function Issues({ searchParams }: Props) {
  const sortBy = searchParams.sortBy;
  const status = searchParams.status;
  const page = searchParams.page;

  return (
    <div className="p-4 w-10/12 space-y-3 container  max-w-screen-2xl h-full">
      <IssuesAction />
      <IssuesTable status={status} sortBy={sortBy} page={page} />
    </div>
  );
}
export default Issues;
