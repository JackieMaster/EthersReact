import React, { useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { injected } from "../../connectors";

export default function NavBar() {
  const { account, error, activate } = useWeb3React();
  const connect = () => {
    try {
      activate(injected);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-white shadow-sm mb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <img
                  src="https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-semibold text-gray-900 text-lg">
                  SushiRoll
                </span>
              </a>
            </div>
          </div>

          <div className=" flex items-center space-x-3 ">
            {account ? (
              <button className="py-2 px-2 font-medium bg-green-50 border-gray-100 rounded transition duration-300">
                {shortenAddress(account)}
              </button>
            ) : error && error instanceof UnsupportedChainIdError ? (
              <button
                onClick={connect}
                className="py-2 px-2 font-medium text-gray-900 bg-red-100 rounded hover:bg-green-400 transition duration-300"
              >
                Wrong network
              </button>
            ) : (
              <button
                onClick={connect}
                className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
              >
                Connect to Metamask
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
