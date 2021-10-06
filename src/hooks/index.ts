import { useEffect, useState } from 'react';

const getAddress = async (setAddr: Function) => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAddr(accounts[0])
    } catch (error) {
        console.log(error)
    }
}

export const useEagerConnect = () => {
    const [address, setAddress] = useState('')
    useEffect(() => {
        getAddress(setAddress);
    }, [address])
    return address;
}