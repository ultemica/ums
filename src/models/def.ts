import { type ZodObject, type ZodRawShape, z } from 'zod'
import { type Integer, UInt8, UInt16 } from './integer'

/**
 * ベースとなるスキーマを安全に拡張するための関数
 */
export function extend<T extends ZodRawShape, U extends Record<string, Integer>>(S: ZodObject<T>, V: U) {
  return S.extend(V)
}

export const DefSchema = z.object({
  name: z.string()
})

export type Def = z.infer<typeof DefSchema>
