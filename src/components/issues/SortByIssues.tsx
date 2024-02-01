"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

export function SortByIssues() {
  const router = useRouter();
  const statusParams = useSearchParams().get("status");

  const sortBy: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleValueChange = (status: Status | "ALL") => {
    const query = status !== "ALL" ? `?status=${status}` : "";
    router.push(`/issues${query}`);
  };
  return (
    <ToggleGroup
      type="single"
      variant={"outline"}
      onValueChange={handleValueChange}
      defaultValue={statusParams || "ALL"}
    >
      <ToggleGroupItem
        size={"sm"}
        key={""}
        value={"ALL"}
        aria-label="Toggle bold"
      >
        All
      </ToggleGroupItem>
      {sortBy.map(({ label, value }) => (
        <ToggleGroupItem
          size={"sm"}
          key={value}
          value={value}
          aria-label="Toggle bold"
        >
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
