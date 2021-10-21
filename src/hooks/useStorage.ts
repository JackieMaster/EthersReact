import React, { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: number) => {
    const firstValue = window.localStorage.getItem(key)
        ? window.localStorage.getItem(key)
        : initialValue;
    const [value, setValue] = useState(firstValue);
    useEffect(() => {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) {
            setValue(storedValue);
        }
    }, [key]);
    useEffect(() => {
        window.localStorage.setItem(key, value as any);
    }, [key, value]);
    return [value, setValue];
};