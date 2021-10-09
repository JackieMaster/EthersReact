import ethers from 'ethers';
import { isMetaMaskInstalled } from '../utils';

import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'


export const injected = new InjectedConnector({
    supportedChainIds: [42]
})



