import { BigNumber } from '@ethersproject/bignumber'
import { createAction } from '@reduxjs/toolkit'

export interface SerializedToken {
    chainId: number
    address: string
    decimals: number
    symbol?: string
    name?: string
}

export interface SerializedPair {
    token0: SerializedToken
    token1: SerializedToken
}

export const updateUserLiquidity = createAction<{
    address: string;
    amount: BigNumber | string;
    pair?: string;
    totalSupply: BigNumber | string;
    token0: string;
    token1: string;
}>('user/updateUserLiquidity')


