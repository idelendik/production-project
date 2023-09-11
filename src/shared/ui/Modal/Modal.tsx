import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Modal.module.scss"
import React, { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "shared/ui/Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider";

interface KeyboardEvent {
    key: string;
}

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY_MS = 300;

export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
}: ModalProps) => {
    const { theme } = useTheme();

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

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

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        }
    }, [isOpen, onKeyDown]);

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true,
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};