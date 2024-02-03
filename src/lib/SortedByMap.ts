import { Issue } from "@/components/issues/IssuesTable";

export const SORTED_BY: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden sm:table-cell " },
  {
    label: "Date Created",
    value: "createdAt",
    className: "hidden sm:table-cell",
  },
];
