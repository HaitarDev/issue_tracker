// import EditForm from "../_components/EditForm";
import dynamic from "next/dynamic";

import NewIssueSkeleton from "../_components/NewIssueSkeleton";

const EditForm = dynamic(() => import("@/app/_components/EditForm"), {
  ssr: false,
  loading: () => <NewIssueSkeleton />,
});
function NewIssue() {
  return <EditForm />;
}
export default NewIssue;
