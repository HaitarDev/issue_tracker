import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(1),
});

export const patchIssueSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(1).optional(),
  userId: z.string().optional().nullable(),
});
