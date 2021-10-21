import { BigNumber } from '@ethersproject/bignumber'
import { createReducer } from '@reduxjs/toolkit'
import {
    updateUserLiquidity
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserLiquidity {
    address: string;
    amount: BigNumber | string;
    pair: string,
    totalSupply: BigNumber | string;
    token0: string;
    token1: string;
}



export const initialState: UserLiquidity = {
    address: '',
    amount: '',
    pair: '',
    totalSupply: '',
    token0: '',
    token1: '',
}

export default createReducer(initialState, builder =>
    builder
        .addCase(updateUserLiquidity, (state, action) => {
            state.amount = action.payload.amount
            state.totalSupply = action.payload.totalSupply
            state.address = action.payload.address
            state.token0 = action.payload.token0
            state.token1 = action.payload.token1


        })

)
