import { ConfirmDeleteIssue } from "@/app/_components/ConfirmDeleteIssue";
import { SelectUserIssue } from "@/components/Issue/SelectUserIssue";
import IssueBadge from "@/components/issues/IssueBadge";
import { Button } from "@/components/ui/button";
import authOptions from "@/lib/AuthOptions";
import { Issue } from "@prisma/client";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function getIssue(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch issues");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function IssuePage({ params }: { params: { id: string } }) {
  const issue: Issue = await getIssue(params.id);
  const session = await getServerSession(authOptions);

  return (
    <div className="flex gap-4 p-4 space-y-3 max-w-screen-xl ">
      <div className="flex-grow space-y-3">
        <h1 className="font-semibold text-xl md:text-2xl ">{issue?.title}</h1>
        <div className="flex gap-6 ">
          <IssueBadge status={issue?.status} />
          <p>{format(issue.createdAt!, "dd/MM/yyyy")}</p>
        </div>
        <div className="py-8 px-4 rounded-lg border ">{issue.description}</div>
      </div>
      <div className="flex flex-col gap-4">
        <SelectUserIssue issue={issue} />
        {session && (
          <>
            <Button>
              <Link
                className="flex gap-1 items-center"
                href={`/issues/${issue.id}/edit`}
              >
                <Edit width={20} />
                Edit issue
              </Link>
            </Button>
            <ConfirmDeleteIssue id={params.id} />
          </>
        )}
      </div>
    </div>
  );
}
export default IssuePage;
