import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Code.module.scss"
import { Button, ButtonTheme } from "../Button";
import { Icon } from "../Icon/Icon";

import CopyIcon from "shared/assets/icons/copy-icon.svg";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
    const onCopy = useCallback( () => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR} onClick={onCopy}>
                <Icon Svg={CopyIcon} className={cls.icon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Code.displayName = "Code"