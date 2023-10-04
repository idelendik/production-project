import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Input.module.scss"
import { ChangeEvent, InputHTMLAttributes, memo, MouseEvent, useEffect, useRef, useState } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">

interface InputProps extends HTMLInputProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        placeholder,
        autofocus = false,
        onChange,
        type = "text",
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            inputRef.current?.focus();
        }
    }, [autofocus]);

    const onBlur = () => {
        setIsFocused(false);
    }

    const onFocus = () => {
        setIsFocused(true);
    }

    const onSelect = (e: MouseEvent<HTMLInputElement>) => {
        console.log((e.target as HTMLInputElement)?.selectionStart);
        setCaretPosition((e.target as HTMLInputElement)?.selectionStart || caretPosition);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    }

    return (
        <div className={classNames(cls.InputWrapper,{ isFocused: isFocused }, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    className={cls.input}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    spellCheck="false"

                    autoFocus={autofocus}
                    ref={inputRef}
                    {...otherProps}
                />
                {isFocused && (
                    <span style={{ left: `${caretPosition * 9}px` }} className={cls.caret}></span>
                )}
            </div>
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Input.displayName = "Input";