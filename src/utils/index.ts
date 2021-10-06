import { getAddress } from '@ethersproject/address'


//Created check function to see if the MetaMask extension is installed
export const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

// returns the checksummed address if the address for valid address or returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

// shortens the address to the format: 0x + 4 characters at start and end
export function shortenAddress(address: string, userAddress: string): string {
    const chars = 4
    const parsed = isAddress(address) || isAddress(userAddress)

    if (!parsed) {
        throw Error(`Error due to Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}