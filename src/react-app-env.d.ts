/// <reference types="react-scripts" />

declare module 'fortmatic'

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    send: (...args: any[]) => void
    ethereum: (...args: any) => void
    request?: (...args: any[]) => any
    removeListener?: (...args: any[]) => void
  }
  web3?: {}
}

declare module 'content-hash' {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}
