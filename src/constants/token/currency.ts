import { ChainId, SUPPORTED_NETWORKS } from 'constants/chain'
import JSBI from 'jsbi'
import { SolidityType } from './constants'
import { validateSolidityTypeInstance } from './utils'
import invariant from 'tiny-invariant'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly chainId: ChainId
  public readonly address: string
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string
  public readonly logo?: string

  private static readonly defaultETHER: Currency = new Currency(ChainId.MAINNET, ZERO_ADDRESS, 18)
  /**
   * Constructs an instance of the base class `Currency`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string, logo?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.chainId = chainId
    this.address = address
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.logo = logo
  }

  public equals(other: Currency): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  public static getNativeCurrency(chainId?: ChainId) {
    if (!chainId || !SUPPORTED_NETWORKS[chainId]) return this.defaultETHER
    return new Currency(
      chainId,
      ZERO_ADDRESS,
      SUPPORTED_NETWORKS[chainId]?.nativeCurrency.decimals || 18,
      SUPPORTED_NETWORKS[chainId]?.nativeCurrency.symbol,
      SUPPORTED_NETWORKS[chainId]?.nativeCurrency.name,
      SUPPORTED_NETWORKS[chainId]?.nativeCurrency.logo
    )
  }

  public get isNative() {
    return this.address === ZERO_ADDRESS
  }

  public sortsBefore(other: Currency): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}
