"use client";

import dynamic from "next/dynamic";

import "easymde/dist/easymde.min.css";

import { createIssueSchema } from "@/schema/createIssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Issue = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
function EditForm({ issue }: { issue?: Issue }) {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const form = useForm<Issue>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: issue?.title,
      description: issue?.description,
    },
  });

  async function onSubmit(values: Issue) {
    try {
      setError("");
      setIsLoading(true);

      // here we register a new issue
      if (!issue) {
        const res = await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Failed to create issue");
        }
      }

      // here we update an existing issue
      if (issue) {
        const res = await fetch(`/api/issues/${issue?.id!}`, {
          method: "PATCH",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(res);
        if (!res.ok) {
          setIsLoading(false);
          throw new Error("Failed to update issue");
        }
      }

      setIsLoading(false);
      setError("");
      router.push("/issues");
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }

  return (
    <div className="p-4 space-y-3 w-2/3">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="issue title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <SimpleMDE {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>{error && error}</p>
            {issue ? (
              <Button type="submit">
                {loading ? "Loading ..." : "Update Issue"}
              </Button>
            ) : (
              <Button type="submit">
                {loading ? "Loading ..." : "Create Issue"}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
export default EditForm;
