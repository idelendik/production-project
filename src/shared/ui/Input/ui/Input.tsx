import { classNames, Mods } from "shared/lib/classNames/classNames";

import cls from "./Input.module.scss"
import { ChangeEvent, InputHTMLAttributes, memo, MouseEvent, useEffect, useRef, useState } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly">

interface InputProps extends HTMLInputProps {
    className?: string;
    value: string | number;
    onChange: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        placeholder,
        autofocus = false,
        onChange,
        readonly,
        type = "text",
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(String(value).length);

    const inputRef = useRef<HTMLInputElement>(null);

    const isCaretVisible = isFocused && !readonly;

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
        setCaretPosition((e.target as HTMLInputElement)?.selectionStart || caretPosition);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    }

    const mods: Mods = {
        [cls.isFocused]: isFocused,
        [cls.readonly]: readonly,
    }

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
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
                    readOnly={readonly}
                    autoFocus={autofocus}
                    ref={inputRef}
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span style={{ left: `${caretPosition * 9}px` }} className={cls.caret}></span>
                )}
            </div>
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Input.displayName = "Input";