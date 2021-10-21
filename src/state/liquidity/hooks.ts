import { BigNumber } from "@ethersproject/bignumber"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from ".."
import { updateUserLiquidity } from './actions'


export function useLiquidityAmount(): any {
    return useAppSelector((state) => state.userLiquidity)
}

export function useUpdateLiquidity(): (amount: BigNumber | string, totalSupply: BigNumber, address: string, token0: string, token1: string) => void {
    const dispatch = useAppDispatch()
    return useCallback(
        (amount: BigNumber | string, totalSupply: BigNumber | string, address: string, token0: string, token1: string) => {
            dispatch(updateUserLiquidity({ amount, totalSupply, address, token0, token1 }));
        },
        [dispatch]
    )
}