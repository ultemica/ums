import { describe, expect } from 'bun:test'
import test, { it } from 'node:test'
import { DefSchema, extend } from '@/models/def'
import { Int8, Int16, type Integer, UInt8, UInt16 } from '@/models/integer'
import type { z } from 'zod'

function format(value: unknown, S: Integer): number {
  return extend(DefSchema, {
    value: S
  }).parse({
    name: `${value}: ${S}`,
    value: value
  }).value.value
}

type Test = {
  value: number
  expected: number
}

describe('Integer Value', () => {
  it('UInt16', () => {
    const values: Test[] = [
      { value: 0, expected: 0 },
      { value: 65535, expected: 65535 },
      { value: 65536, expected: 0 },
      { value: -1, expected: 65535 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, UInt16)).toStrictEqual(expected)
    }
  })

  it('UInt8', () => {
    const values: Test[] = [
      { value: 0, expected: 0 },
      { value: 255, expected: 255 },
      { value: 256, expected: 0 },
      { value: -1, expected: 255 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, UInt8)).toStrictEqual(expected)
    }
  })

  it('Int16', () => {
    const values: Test[] = [
      { value: 0, expected: 0 },
      { value: 32767, expected: 32767 },
      { value: -32768, expected: -32768 },
      { value: 32768, expected: -32768 },
      { value: -32769, expected: 32767 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, Int16)).toStrictEqual(expected)
    }
  })

  it('Int8', () => {
    const values: Test[] = [
      { value: 0, expected: 0 },
      { value: 127, expected: 127 },
      { value: -128, expected: -128 },
      { value: 128, expected: -128 },
      { value: -129, expected: 127 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, Int8)).toStrictEqual(expected)
    }
  })
})

describe('Specific Primitive Value', () => {
  it('UInt16', () => {
    const values: Test[] = [
      { value: Number.POSITIVE_INFINITY, expected: 0 },
      { value: Number.NEGATIVE_INFINITY, expected: 0 },
      { value: Number.NaN, expected: 0 },
      { value: Number.MAX_VALUE, expected: 0 },
      { value: Number.MIN_VALUE, expected: 0 },
      { value: Number.MAX_SAFE_INTEGER, expected: 65535 },
      { value: Number.MIN_SAFE_INTEGER, expected: 1 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, UInt16)).toStrictEqual(expected)
    }
  })

  it('UInt8', () => {
    const values: Test[] = [
      { value: Number.POSITIVE_INFINITY, expected: 0 },
      { value: Number.NEGATIVE_INFINITY, expected: 0 },
      { value: Number.NaN, expected: 0 },
      { value: Number.MAX_VALUE, expected: 0 },
      { value: Number.MIN_VALUE, expected: 0 },
      { value: Number.MAX_SAFE_INTEGER, expected: 255 },
      { value: Number.MIN_SAFE_INTEGER, expected: 1 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, UInt8)).toStrictEqual(expected)
    }
  })

  it('Int16', () => {
    const values: Test[] = [
      { value: Number.POSITIVE_INFINITY, expected: -32768 },
      { value: Number.NEGATIVE_INFINITY, expected: -32768 },
      { value: Number.NaN, expected: -32768 },
      { value: Number.MAX_VALUE, expected: -32768 },
      { value: Number.MIN_VALUE, expected: 0 },
      { value: Number.MAX_SAFE_INTEGER, expected: 0 },
      { value: Number.MIN_SAFE_INTEGER, expected: 1 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, Int16)).toStrictEqual(expected)
    }
  })

  it('Int8', () => {
    const values: Test[] = [
      { value: Number.POSITIVE_INFINITY, expected: -128 },
      { value: Number.NEGATIVE_INFINITY, expected: -128 },
      { value: Number.NaN, expected: -128 },
      { value: Number.MAX_VALUE, expected: -128 },
      { value: Number.MIN_VALUE, expected: 0 },
      { value: Number.MAX_SAFE_INTEGER, expected: 0 },
      { value: Number.MIN_SAFE_INTEGER, expected: 1 }
    ]
    for (const { value, expected } of values) {
      expect(format(value, Int8)).toStrictEqual(expected)
    }
  })
})

describe('Not Integer Value', () => {
  const values = [
    {
      value: '0'
    },
    {
      value: true
    },
    {
      value: false
    },
    {
      value: {}
    },
    {
      value: []
    },
    {
      value: [1, 2, 3]
    },
    {
      value: new Date()
    }
  ]

  it('UInt16', () => {
    for (const { value } of values) {
      expect(() => format(value, UInt16)).toThrow()
    }
  })

  it('UInt8', () => {
    for (const { value } of values) {
      expect(() => format(value, UInt8)).toThrow()
    }
  })

  it('Int16', () => {
    for (const { value } of values) {
      expect(() => format(value, Int16)).toThrow()
    }
  })

  it('Int8', () => {
    for (const { value } of values) {
      expect(() => format(value, Int8)).toThrow()
    }
  })
})
