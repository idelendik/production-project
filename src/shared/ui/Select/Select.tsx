import { classNames, Mods } from "shared/lib/classNames/classNames";

import cls from "./Select.module.scss"
import { ChangeEvent, memo, useMemo } from "react";

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value:string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange,
    } = props;

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    }

    const optionsList = useMemo(() => {
        return options?.map(opt => (
            <option
                className={cls.option}
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        ))
    }, [options]);

    return (
        <div className={classNames(cls.wrapper, mods, [className])}>
            {label && <span className={cls.label}>{label + ">"}</span>}
            <select
                className={cls.select}
                value={value}
                disabled={readonly}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Select.displayName = "Select";