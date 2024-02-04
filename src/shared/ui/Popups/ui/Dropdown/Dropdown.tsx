import { Menu } from "@headlessui/react";

import cls from "./Dropdown.module.scss";
import popupCls from "../../styles/popup.module.scss";

import { classNames } from "shared/lib/classNames/classNames";
import { Fragment, ReactNode } from "react";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionClass } from "../../styles/consts";

interface DropdownItem {
    content?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        items,
        trigger,
        direction = "bottom right",
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button className={classNames("", {}, [popupCls.trigger, cls.trigger])}>
                {trigger}
            </Menu.Button>

            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, idx) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            disabled={item.disabled}
                            type="button"
                            className={classNames(cls.item, { [popupCls.active]: active, [popupCls.disabled]: item.disabled }, [])}
                            onClick={item.onClick}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} key={idx} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment} key={idx} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}