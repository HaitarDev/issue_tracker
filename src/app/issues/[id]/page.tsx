import IssueBadge from "@/components/issues/IssueBadge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
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
  const issue = await getIssue(params.id);

  return (
    <div className="flex gap-4 p-4 space-y-3 max-w-screen-xl ">
      <div className="flex-grow space-y-3">
        <h1 className="font-semibold text-xl md:text-2xl ">{issue?.title}</h1>
        <div className="flex gap-6 ">
          <IssueBadge status={issue?.status} />
          <p>{issue?.createdAt}</p>
        </div>
        <div className="py-8 px-4 rounded-lg border ">{issue.description}</div>
      </div>

      <Button>
        <Link
          className="flex gap-1 items-center"
          href={`/issues/${issue.id}/edit`}
        >
          <Edit width={20} />
          Edit issue
        </Link>
      </Button>
    </div>
  );
}
export default IssuePage;
