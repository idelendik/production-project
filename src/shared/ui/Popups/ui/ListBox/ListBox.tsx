import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';

import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button';
import { DropdownDirection } from '@/shared/types/ui';

import { mapDirectionClass } from '../../styles/consts';

interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    label?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
}

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        label,
        readonly,
        direction = 'bottom right',
        onChange,
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HListBox
            disabled={readonly}
            as="div"
            className={classNames(cls.ListBox, { [cls.readonly]: readonly }, [
                className,
                popupCls.popup,
            ])}
            value={value}
            onChange={onChange}
        >
            {label && (
                <HListBox.Label className={cls.label}>{label}</HListBox.Label>
            )}
            <div className={cls.control}>
                <HListBox.Button
                    as="div"
                    className={classNames('', {}, [
                        popupCls.trigger,
                        cls.trigger,
                    ])}
                >
                    <Button>{value ?? defaultValue}</Button>
                </HListBox.Button>

                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: item.disabled,
                                        },
                                        [],
                                    )}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </div>
        </HListBox>
    );
}
