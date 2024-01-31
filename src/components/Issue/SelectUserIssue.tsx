"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Issue, User } from "@prisma/client";
import Skeleton from "react-loading-skeleton";

export function SelectUserIssue({ issue }: { issue: Issue }) {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
    retry: 3,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <Skeleton width={130} height={30} />;

  if (error) return null;

  return (
    <Select
      onValueChange={(val) => {
        fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          body: JSON.stringify({ userId: val }),
        }).then((res) => res.json());
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>

          <SelectItem key={"unsign"} value={"null"}>
            Unsign
          </SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}