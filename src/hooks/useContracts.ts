import { getContract } from '../utils'
import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useActiveWeb3React } from './index'
import { UNISWAP_V2_FACTORY } from '../constants'
import UniswapV2FactoryAbi from '../constants/abi/uniswapV2Factory.json'


// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}


export function useV2FactoryContract(): Contract | null {
    return useContract(UNISWAP_V2_FACTORY, UniswapV2FactoryAbi, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function usePair(address1: string, address2: string): any {
    const factory = useV2FactoryContract();
    const pair =  factory?.getPair(address1, address2)
    return usePairContract(pair)
}


