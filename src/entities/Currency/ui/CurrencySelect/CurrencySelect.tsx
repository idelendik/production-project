import { classNames } from "shared/lib/classNames/classNames";

import cls from "./CurrencySelect.module.scss"
import { Select } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { memo, useCallback } from "react";
import { ListBox } from "shared/ui/ListBox/ListBox";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.BYN, content: Currency.BYN },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.CNY, content: Currency.CNY },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;

    const { t } = useTranslation("currencySelect");

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
            className={classNames(cls.CurrencySelect,{}, [className])}
            items={options}
            value={value}
            defaultValue={t("select_currency")}
            label={`${t("your_currency")}>`}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top"
        />
    )
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CurrencySelect.displayName = "CurrencySelect";