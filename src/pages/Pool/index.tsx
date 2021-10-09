import React from "react";
import sushiTokenList from "@sushiswap/default-token-list";
import KovanTokenList from "../../constants/tokenLists/kovanTokenList.json";
import Token from "../../components/Token";

export default function Pool() {
  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="grid gap-x-4 gap-y-4 md:grid-cols-3  bg-gray-100 px-2 py-2 rounded">
        <div className="  shadow-md border-gray-100 rounded border-1 bg-white">
          <div className="p-2 semi-bold">COPY TO FIND YOUR LP TOKEN</div>
          {KovanTokenList.tokens.map((token, index) => (
            <Token token={token} key={index + token.symbol} />
          ))}
        </div>
        <div className=" flex flex-col shadow-md border-gray-100 rounded border-1 bg-white">
          <div className="p-2 semi-bold">FIND YOUR LP TOKEN</div>
          <div className="p-4 min-w-full">
            <input className=" p-4 min-w-full border rounded border-gray-200 focus:blue-50 ..." />
          </div>
          <div className="p-4 min-w-full">
            <input className=" p-4 min-w-full border rounded border-gray-200 focus:blue-50 ..." />
          </div>
        </div>
        <div className=" shadow-md border-gray-100 rounded border-1 bg-white">
          <input />
        </div>
      </div>
    </div>
  );
}
