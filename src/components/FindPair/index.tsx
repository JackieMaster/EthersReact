import React, { useState, useEffect } from "react";
import { abi as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { AddressZero } from "@ethersproject/constants";
import {
  Fetcher,
  Token,
  Fraction,
  FACTORY_ADDRESS,
  INIT_CODE_HASH,
} from "@uniswap/sdk";
import { pack, keccak256 } from "@ethersproject/solidity";
import { getCreate2Address } from "@ethersproject/address";
import { BigNumber, ethers } from "ethers";
import Input from "../Input";
import {
  useV2FactoryContract,
  usePairContract,
} from "../../hooks/useContracts";
import { useActiveWeb3React } from "../../hooks";
import KovanTokenList from "../../constants/tokenLists/kovanTokenList.json";
import { getContract } from "../../utils";
import { isAddress } from "../../utils";
import {
  useLiquidityAmount,
  useUpdateLiquidity,
} from "../../state/liquidity/hooks";
import { formatBalance } from "../../utils";

interface InputToken {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}
const Index: React.FC = () => {
  const [fisrtAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const factory = useV2FactoryContract();
  const { account, library } = useActiveWeb3React();
  const [error, setError] = useState("");
  const [LP, setLP] = useState("");
  const [loading, setLoading] = useState(false);
  const updateLiqudity = useUpdateLiquidity();
  const liquidity = useLiquidityAmount();

  const findSelectedLP = () => {
    const [token1, token0] = KovanTokenList.tokens.filter((token) => {
      return token.address === fisrtAddress || token.address === secondAddress;
    });
    setLP(`${token1.symbol}/${token0.symbol}`);
    return [token1, token0];
  };

  const tokenObject = (token: InputToken) => {
    return new Token(
      token.chainId,
      token.address,
      token.decimals,
      token.symbol,
      token.name
    );
  };
  const getPairBalance = async () => {
    setError("");

    if (isAddress(fisrtAddress.trim()) && isAddress(secondAddress.trim())) {
      try {
        setLoading(true);
        // const [token1, token0] = findSelectedLP();
        // const tokenOne = tokenObject(token1);
        // const tokenZero = tokenObject(token0);
        // const PairData = await Fetcher.fetchPairData(tokenOne, tokenZero);
        // console.log(PairData);

        const pair = await factory?.getPair(fisrtAddress, secondAddress);
        console.log(pair);
        if (pair === AddressZero) {
          return setError("This Pair does not exist");
        }
        const pairContract = getContract(
          pair,
          IUniswapV2PairABI,
          library,
          account
        );
        const balance = await pairContract.balanceOf(account);
        const lBalance = new Fraction(balance);

        const totalSupply = await pairContract.totalSupply();
        updateLiqudity(balance, totalSupply, pair, fisrtAddress, secondAddress);
        findSelectedLP();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("One or two of the address input is invalid");
    }
  };

  const handleFirstChange = (event: any) => {
    setFirstAddress(event?.target?.value);
  };
  const handleSecondChange = (event: any) => {
    setSecondAddress(event?.target?.value);
  };
  return (
    <div>
      <Input
        name="firstAddress"
        value={fisrtAddress}
        onChange={handleFirstChange}
      />
      <Input
        name="secondAddress"
        value={secondAddress}
        onChange={handleSecondChange}
      />
      <div className="p-4">
        <button
          type="button"
          disabled={loading}
          onClick={getPairBalance}
          className="font-bold p-2 min-w-full text-bold text-white border rounded bg-blue-700 rounded transition duration-300"
        >
          {loading ? " Loading..." : "GET LP TOKEN"}
        </button>
      </div>
      <div>{error}</div>
      <div className="p-4  font-bold">
        {liquidity.amount
          ? `You have ${formatBalance(
              liquidity.amount
            )} ${LP} LP Token on Uniswap`
          : null}
      </div>
    </div>
  );
};

export default Index;
