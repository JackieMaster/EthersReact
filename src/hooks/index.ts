import { useEffect, useState } from 'react';

import { Web3Provider } from '@ethersproject/providers'
// import { ChainId } from '@sushiswap/sdk'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { isMobile } from 'react-device-detect'
import { injected } from '../connectors'
import { NetworkContextName } from '../constants'

export function useActiveWeb3React(): any & { chainId?: any } {
    const context = useWeb3ReactCore<Web3Provider>()
    const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
    return context.active ? context : contextNetwork
}

export function useEagerConnect() {
    const { activate, active } = useWeb3ReactCore()
    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then(isAuthorized => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                if (isMobile && window.ethereum) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true)
                    })
                } else {
                    setTried(true)
                }
            }
        })
    }, [activate])


    useEffect(() => {
        if (active) {
            setTried(true)
        }
    }, [active])

    return tried
}


export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3ReactCore()

    useEffect(() => {
        const { ethereum } = window

        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = () => {

                activate(injected, undefined, true).catch(error => {
                    console.error('Failed to activate after chain changed', error)
                })
            }

            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {

                    activate(injected, undefined, true).catch(error => {
                        console.error('Failed to activate after accounts changed', error)
                    })
                }
            }

            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                }
            }
        }
        return undefined
    }, [active, error, suppress, activate])
}
