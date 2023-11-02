import { useCallback, useRef } from "react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
    const throttleRef = useRef(false);

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    return useCallback((...args: any[]) => {
        if(!throttleRef.current) {
            callback(...args);
            throttleRef.current = true;
        }

        setTimeout(() => {
            throttleRef.current = false;
        }, delay);
    }, [callback, delay]);
}