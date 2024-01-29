"use client";
import { Button } from "@/components/ui/button";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NewIssueSkeleton() {
  return (
    <div className="p-4 space-y-3 w-2/3">
      <div>
        <div>
          <form className="space-y-3">
            <div>
              <label htmlFor="title">Title</label>
              <Skeleton />
            </div>
            <div>
              <label htmlFor="title">Description</label>
              <Skeleton height={200} />
            </div>
            <Button type="submit">Loading ...</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default NewIssueSkeleton;
