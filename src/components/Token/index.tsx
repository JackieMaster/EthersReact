import React, { FC } from "react";
import { shortenAddress } from "../../utils";

interface TokenProp {
  token: {
    address: string;
    chainId: number;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
  };
}

const Index: FC<TokenProp> = ({ token }: TokenProp) => {
  return (
    <div className="flex rounded justify-between">
      <div className="w-full flex  items-center p-2 border-gray-300">
        <img
          className="rounded-full h-12 w-12 border-gray-200 border"
          alt="logo"
          src={token.logoURI}
        />
        <div className="pl-4 w-full md:flex">
          <div className="md:w-3/5 flex flex-col justify-between">
            <span className="block text-base font-semibold text-indigo-500">
              {token.symbol}
            </span>
            <span className="text-sm flex text-gray-600">{token.name}</span>
            <span className="text-sm flex font-thin text-gray-600">
              {shortenAddress(token.address)}
            </span>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => navigator.clipboard.writeText(token.address)}
          className="p-4 rounded active:bg-green-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Index;
