import { HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Card.module.scss"

export enum CardTheme {
    NORMAL = "normal",
    OUTLINED = "outlined"
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        theme = CardTheme.NORMAL,
        children,
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(cls.Card, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Card.displayName = "Card"