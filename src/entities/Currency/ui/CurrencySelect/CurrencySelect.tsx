import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CurrencySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

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
    const { className, value, onChange, readonly } = props;

    const { t } = useTranslation('currencySelect');

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    const listBoxProps = {
        className: classNames(cls.CurrencySelect, {}, [className]),
        items: options,
        value,
        defaultValue: t('select_currency'),
        label: t('your_currency'),
        onChange: onChangeHandler,
        readonly,
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ListBox {...listBoxProps} />}
            off={<ListBoxDeprecated {...listBoxProps} />}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CurrencySelect.displayName = 'CurrencySelect';
