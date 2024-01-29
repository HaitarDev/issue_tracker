import { z } from "zod";

export const createIssueSchema = z.object({
  // id: z.number(),
  title: z.string().min(3).max(255),
  description: z.string().min(1),
  // status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});
