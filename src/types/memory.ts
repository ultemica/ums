/**
 * データテーブルなどが保存されているメモリ
 */
export class ReadOnlyMemory {
  private data: Uint8Array
  constructor(buffer: ArrayBuffer) {
    this.data = new Uint8Array(buffer)
  }
  read(addr: number, length = 1): Uint8Array {
    return this.data.slice(addr, addr + length)
  }
  get length(): number {
    return this.data.length
  }
}

/**
 * 現在の状態などが保存されているメモリ
 */
export class RandomAccessMemory {
  private data: Uint8Array
  constructor(buffer: ArrayBuffer) {
    this.data = new Uint8Array(buffer)
  }
  read(addr: number, length = 1): Uint8Array {
    return this.data.slice(addr, addr + length)
  }
  write(addr: number, data: Uint8Array): void {
    this.data.set(data, addr)
  }
  get length(): number {
    return this.data.length
  }
}
