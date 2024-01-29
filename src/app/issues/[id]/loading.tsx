import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

async function IssueLoading() {
  return (
    <div className="flex gap-4 p-4 space-y-3 max-w-screen-xl ">
      <div className="flex-grow space-y-3">
        <h1 className="font-semibold text-xl md:text-2xl ">
          <Skeleton />
        </h1>
        <div className="flex gap-6 ">
          <Skeleton />
          <p>
            <Skeleton />
          </p>
        </div>
        <div className="py-8 px-4 rounded-lg border ">
          <Skeleton />
        </div>
      </div>

      <Button className="flex gap-1">
        <Edit width={20} />
        Edit issue
      </Button>
    </div>
  );
}
export default IssueLoading;
