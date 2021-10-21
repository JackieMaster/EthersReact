import { useMemo } from 'react'
export const calculateAmountMin = (slippage: number, amountIn: number) => {
    const amountMin = useMemo(() => ((1 - (slippage / 100)) * amountIn), [slippage, amountIn])
    return amountMin
}
