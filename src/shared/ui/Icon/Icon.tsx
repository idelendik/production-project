import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Icon.module.scss"

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo(({ className, Svg, inverted }: IconProps) => {
    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Icon.displayName = "Icon"