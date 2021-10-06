import React from "react";
import sushiTokenList from "@sushiswap/default-token-list";

export default function Pool() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {sushiTokenList.tokens.map((token) => (
        <div>{token.name}</div>
      ))}
    </div>
  );
}
