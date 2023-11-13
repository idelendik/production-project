import { MutableRefObject, useEffect } from "react";

interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
    const { callback, triggerRef, wrapperRef } = props;

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        let observer: IntersectionObserver | null = null;

        if (callback) {
            const options: IntersectionObserverInit = {
                root: wrapperElement,
                rootMargin: "0px",
                threshold: 1.0,
            }

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerElement);
        }

        return () => {
            if(observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        }
    }, [triggerRef, wrapperRef, callback]);
}