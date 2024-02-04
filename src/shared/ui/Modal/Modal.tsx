import { classNames, Mods } from "shared/lib/classNames/classNames";

import cls from "./Modal.module.scss"
import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import { useTheme } from "app/providers/ThemeProvider";

interface KeyboardEvent {
    key: string;
}

export interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY_MS = 300;

export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
    lazy,
}: ModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const { theme } = useTheme();

    useEffect(() => {
        if(isOpen) {
            setIsMounted(true);
        }

        return () => {
            setIsMounted(false);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY_MS);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent): void => {
        if (e.key === "Escape") {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        }
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, "app_modal"])}>
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};