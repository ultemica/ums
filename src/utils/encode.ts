import { Int8, Int16, UInt8, UInt16 } from '@/models/integer'
import { ZodBoolean, ZodNumber, type ZodObject, type ZodRawShape, ZodString, infer, z } from 'zod'

export function encode<T extends ZodRawShape>(S: ZodObject<T>, V: z.infer<ZodObject<T>>): Uint8Array {
  const buffer: number[] = []
  for (const [key, def] of Object.entries(S.shape)) {
    // 文字列については文字列テーブルとしてエンコードするのでスキップ
    if (def instanceof ZodString) {
      continue
    }
    const { value } = z.object({ value: z.number().int() }).parse(V[key])
    // Integer型をバイナリにリトルエンディアンでエンコードする
    switch (def) {
      case UInt16: {
        const arr = new Uint8Array(2)
        new DataView(arr.buffer).setUint16(0, value, true)
        buffer.push(arr[0], arr[1])
        break
      }
      case Int16: {
        const arr = new Uint8Array(2)
        new DataView(arr.buffer).setInt16(0, value, true)
        buffer.push(arr[0], arr[1])
        break
      }
      case UInt8: {
        const arr = new Uint8Array(1)
        new DataView(arr.buffer).setUint8(0, value)
        buffer.push(arr[0])
        break
      }
      case Int8: {
        const arr = new Uint8Array(1)
        new DataView(arr.buffer).setInt8(0, value)
        buffer.push(arr[0])
        break
      }
      default:
        throw new Error(`Unsupported type: ${def}`)
    }
  }
  return Uint8Array.from(buffer)
}
