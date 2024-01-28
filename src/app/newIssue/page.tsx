"use client";

import SimpleMDE from "react-simplemde-editor";
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

function NewIssue() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const form = useForm<Issue>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: Issue) {
    try {
      setError("");
      setIsLoading(true);
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

      setIsLoading(false);
      setError("");
      router.push("/issues");
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }

  return (
    <div>
      <h1>New Issue</h1>

      <div className="w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button type="submit">
              {loading ? "Loading ..." : "Create issue"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default NewIssue;
