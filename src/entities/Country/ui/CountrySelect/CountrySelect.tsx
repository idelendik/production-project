import { classNames } from "shared/lib/classNames/classNames";

import cls from "./CountrySelect.module.scss"
import { Select } from "shared/ui/Select/Select";
import { memo, useCallback } from "react";
import { Country } from "../../model/types/country";
import { useTranslation } from "react-i18next";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.China, content: Country.China },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.India, content: Country.India },
]

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        readonly,
        onChange,
    } = props;

    const { t } = useTranslation("countrySelect");

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [onChange]);

    return (
        <Select
            className={classNames(cls.CountrySelect,{}, [className])}
            label={t("your_country")}
            value={value}
            options={options}
            readonly={readonly}
            onChange={onChangeHandler}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CountrySelect.displayName = "CountrySelect";