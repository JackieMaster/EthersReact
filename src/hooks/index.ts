import { useEffect, useState } from 'react';

const getAddress = async (setAddr: Function) => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAddr(accounts[0])
    } catch (error) {
        console.log(error)
    }
}

export const useEagerConnect = (userAddress: string) => {
    const [address, setAddress] = useState('')
    useEffect(() => {
        getAddress(setAddress);
    }, [userAddress])
    return address;
}

export function useInactiveListener(setAccount: Function) {

    useEffect((): any => {
        const { ethereum } = window as any
        if (ethereum && ethereum.on) {
            const handleConnect = () => {
                console.log("Handling 'connect' event")
            }
            const handleChainChanged = (chainId: string | number) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                window.location.reload()
            }
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                }
            }
            const handleNetworkChanged = (networkId: string | number) => {
                console.log("Handling 'networkChanged' event with payload", networkId)
                window.location.reload()
            }

            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('networkChanged', handleNetworkChanged)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                    ethereum.removeListener('networkChanged', handleNetworkChanged)
                }
            }
        }
    }, [setAccount])
}