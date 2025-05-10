import { describe, expect } from 'bun:test'
import test, { it } from 'node:test'
import { DefSchema, extend } from '@/models/def'
import { Int8, Int16, UInt8, UInt16 } from '@/models/integer'
import type { z } from 'zod'

const TestSchema = extend(DefSchema, {
  u16: UInt16,
  u8: UInt8,
  i8: Int8,
  i16: Int16
})
type Test = z.infer<typeof TestSchema>

describe('Integer Value', () => {
  const test: Test = TestSchema.parse({
    name: 'integer value',
    u16: 100000,
    u8: 1000,
    i8: 1000,
    i16: 100000
  })

  it('UInt16', () => {
    expect(test.u16.value).toStrictEqual(34464)
  })

  it('UInt8', () => {
    expect(test.u8.value).toStrictEqual(232)
  })

  it('Int16', () => {
    expect(test.i16.value).toStrictEqual(-31072)
  })

  it('Int8', () => {
    expect(test.i8.value).toStrictEqual(-24)
  })
})
