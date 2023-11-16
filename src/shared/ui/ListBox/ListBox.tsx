import { Fragment, ReactNode } from "react"
import { Listbox as HListBox } from "@headlessui/react"

import cls from "./ListBox.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "../Button";
import { DropdownDirection } from "shared/types/ui";

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

const mapDirectionClass: Record<DropdownDirection, string> = {
    "top left": cls.optionsTopLeft,
    "top right": cls.optionsTopRight,
    "bottom right": cls.optionsBottomRight,
    "bottom left": cls.optionsBottomLeft,
};

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        label,
        readonly,
        direction = "bottom right",
        onChange
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HListBox
            disabled={readonly}
            as="div"
            className={classNames(cls.ListBox, { [cls.readonly]: readonly }, [className])}
            value={value}
            onChange={onChange}
        >
            {label && <HListBox.Label className={cls.label}>{label}</HListBox.Label>}
            <div className={cls.control}>
                <HListBox.Button as="div" className={cls.trigger}>
                    <Button>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>

                <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled
                                    }, [])}
                                >
                                    {selected && "!!!"}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </div>
        </HListBox>
    )
}