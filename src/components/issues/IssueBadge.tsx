import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";

const statusMap: Record<Status, { label: string; status: string }> = {
  OPEN: {
    label: "Open",
    status: "open",
  },
  IN_PROGRESS: {
    label: "In Progress",
    status: "progress",
  },
  CLOSED: {
    label: "Closed",
    status: "closed",
  },
};
function IssueBadge({ status }: { status: Status }) {
  return (
    <Badge variant={statusMap[status].status}>{statusMap[status].label}</Badge>
  );
}
export default IssueBadge;
