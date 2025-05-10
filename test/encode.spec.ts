import { describe, expect } from 'bun:test'
import test, { it } from 'node:test'
import { DefSchema, extend } from '@/models/def'
import { Int8, Int16, UInt8, UInt16 } from '@/models/integer'
import { encode } from '@/utils/encode'
import type { z } from 'zod'

const TestSchema = extend(DefSchema, {
  u16: UInt16,
  u8: UInt8,
  i8: Int8,
  i16: Int16
})
type Test = z.infer<typeof TestSchema>

describe('Encode', () => {
  const test: Test = TestSchema.parse({
    name: 'integer value',
    u16: 100000,
    u8: 1000,
    i8: 1000,
    i16: 100000
  })

  it('Binary', () => {
    expect(encode(TestSchema, test)).toStrictEqual(new Uint8Array([160, 134, 232, 232, 160, 134]))
  })
})
