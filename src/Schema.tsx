import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().uuid(),
  task: z
    .string()
    .min(1, { message: "タスクを入力してください" })
    .max(15, { message: "タスクは15文字以内で入力してください" }),
  description: z
    .string()
    .min(15, { message: "説明文は15文字以上入力してください" })
    .max(100, { message: "説明文は100文字以下で入力してください" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "説明文はアルファベットと英数字で記入してください",
    }),
  checked: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;

export const formSchema = z.object({
  task: z
    .string()
    .min(1, { message: "タスクを入力してください" })
    .max(15, { message: "タスクは15文字以内で入力してください" }),
  description: z
    .string()
    .min(15, { message: "説明文は15文字以上入力してください" })
    .max(100, { message: "説明文は100文字以下で入力してください" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "説明文はアルファベットと英数字で記入してください",
    }),
});

export type Form = z.infer<typeof formSchema>;
