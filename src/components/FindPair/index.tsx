import React, { useState, useEffect } from "react";
import { abi as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { AddressZero } from "@ethersproject/constants";
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

const Index: React.FC = () => {
  const [fisrtAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const factory = useV2FactoryContract();
  const { account, library } = useActiveWeb3React();
  const [LPbalance, setLPbalance] = useState("");
  const [error, setError] = useState("");
  const [LP, setLP] = useState("");

  const findSelectedLP = () => {
    const [token1, token0] = KovanTokenList.tokens.filter((token) => {
      return token.address === fisrtAddress || token.address === secondAddress;
    });
    setLP(`${token1.symbol}/${token0.symbol}`);
  };
  const getPairBalance = async () => {
    setError("");
    setLPbalance("");
    if (isAddress(fisrtAddress.trim()) && isAddress(secondAddress.trim())) {
      const pair = await factory?.getPair(fisrtAddress, secondAddress);
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
      setLPbalance(balance);
      findSelectedLP();
    } else {
      setError("One or two of the address input is invalid");
    }
  };

  const formatBalance = (balance: BigNumber | string) => {
    if (balance) {
      return parseFloat(ethers.utils.formatUnits(balance, 18));
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
          onClick={getPairBalance}
          className="font-bold p-2 min-w-full text-bold text-white border rounded bg-blue-700 rounded transition duration-300"
        >
          GET LP TOKEN
        </button>
      </div>
      <div>{error}</div>
      <div className="p-4  font-bold">
        {LPbalance
          ? `You have ${formatBalance(LPbalance)} ${LP} LP Token on Uniswap`
          : null}
      </div>
    </div>
  );
};

export default Index;
