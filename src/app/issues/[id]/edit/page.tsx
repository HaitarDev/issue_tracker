import dynamic from "next/dynamic";

import NewIssueSkeleton from "@/app/_components/NewIssueSkeleton";

const EditForm = dynamic(() => import("@/app/_components/EditForm"), {
  ssr: false,
  loading: () => <NewIssueSkeleton />,
});

async function getIssue(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);

    if (!res.ok) {
      throw new Error("There is no such issue");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function EditIssuePage({ params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);

  return <EditForm issue={issue} />;
}
export default EditIssuePage;
