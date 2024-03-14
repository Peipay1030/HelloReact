import { z } from 'zod'

/// zod:ライブラリ
/// オブジェクト内の要素の制約を定義
/// 入力値が誤っていたらエラーメッセージを返す
export const todoschema = z.object({
  id: z.string().uuid(),
  task: z
    .string()
    .min(1, { message: 'タスクを入力してください' })
    .max(15, { message: 'タスクは15文字以内で入力してください' }),
  description: z
    .string()
    .min(15, { message: '説明は15文字以上で入力してください' })
    .max(100, { message: '説明は100文字以下で入力してください' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '説明はアルファベットと英数字で入力してください'
    }),
  status: z.enum(['Todo', 'Doing', 'Done'])
})

export type Todo = z.infer<typeof todoschema>

export const formschema = z.object({
  task: z
    .string()
    .min(1, { message: 'タスクを入力してください' })
    .max(15, { message: 'タスクは15文字以内で入力してください' }),
  description: z
    .string()
    .min(15, { message: '説明文は15文字以上入力してください' })
    .max(100, { message: '説明文は100文字以下で入力してください' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '説明文はアルファベットと英数字で記入してください'
    })
})

export type Form = z.infer<typeof formschema>
