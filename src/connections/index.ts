import ethers from 'ethers';
import { isMetaMaskInstalled } from '../utils';

export const connectMetamask = async () => {
    if (isMetaMaskInstalled()) {
        try {
            // Will open the MetaMask UI
            // The button should be disabled while the promise is pending!
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0])
            return accounts[0];
        } catch (error) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(error);
            }
        }
    } else {
        return 'Intall metamask'
    }
}

