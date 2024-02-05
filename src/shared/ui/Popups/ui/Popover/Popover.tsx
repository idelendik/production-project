import { Popover as HPopover } from "@headlessui/react"

import { DropdownDirection } from "@/shared/types/ui";
import { ReactNode } from "react";

import cls from "./Popover.module.scss"
import popupCls from "../../styles/popup.module.scss";

import { mapDirectionClass } from "../../styles/consts";
import { classNames } from "@/shared/lib/classNames/classNames";

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const {
        className,
        trigger,
        direction = "bottom left",
        children
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as="div" className={classNames("", {}, [popupCls.trigger, cls.trigger])}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}