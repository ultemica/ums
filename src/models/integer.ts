import { z } from 'zod'

/**
 * Unsigned 8-bit integer
 */
export const UInt8 = z.preprocess(
  (input: unknown) => {
    if (typeof input === 'number') {
      return { value: input & 0xff, type: 'u8' }
    }
    throw new Error('Input is not a number')
  },
  z.object({
    value: z.number().int().gte(0).lte(255),
    type: z.literal('u8')
  })
)

/**
 * Unsigned 16-bit integer
 */
export const UInt16 = z.preprocess(
  (input: unknown) => {
    if (typeof input === 'number') {
      return { value: input & 0xffff, type: 'u16' }
    }
    throw new Error('Input is not a number')
  },
  z.object({
    value: z.number().int().gte(0).lte(65535),
    type: z.literal('u16')
  })
)

/**
 * Signed 8-bit integer
 */
export const Int8 = z.preprocess(
  (input: unknown) => {
    if (typeof input === 'number') {
      const v = ((input + 128) & 0xff) - 128
      return { value: v, type: 'i8' }
    }
    throw new Error('Input is not a number')
  },
  z.object({
    value: z.number().int().gte(-128).lte(127),
    type: z.literal('i8')
  })
)

/**
 * Signed 16-bit integer
 */
export const Int16 = z.preprocess(
  (input: unknown) => {
    if (typeof input === 'number') {
      const v = ((input + 32768) & 0xffff) - 32768
      return { value: v, type: 'i16' }
    }
    throw new Error('Input is not a number')
  },
  z.object({
    value: z.number().int().gte(-32768).lte(32767),
    type: z.literal('i16')
  })
)

export type UInt8 = z.infer<typeof UInt8>
export type UInt16 = z.infer<typeof UInt16>
export type Int8 = z.infer<typeof Int8>
export type Int16 = z.infer<typeof Int16>

export type Integer = typeof UInt16 | typeof UInt8 | typeof Int8 | typeof Int16
