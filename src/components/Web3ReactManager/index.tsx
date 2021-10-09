import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../../hooks";
import { NetworkContextName } from "../../constants";

export default function Web3ReactManager({
  children,
}: {
  children: JSX.Element;
}) {
  const { active } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React(NetworkContextName);

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  return children;
}
