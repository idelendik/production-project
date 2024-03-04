import React, { memo, useCallback } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../Button';
import { ButtonTheme } from '../../deprecated/Button/index';
import { Icon } from '../Icon';

import CopyIconDeprecated from '@/shared/assets/icons/copy-icon.svg';
import CopyIcon from '@/shared/assets/icons/copy-icon-r.svg';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <pre
                    className={classNames(cls.CodeRedesigned, {}, [className])}
                >
                    <Icon
                        clickable
                        Svg={CopyIcon}
                        className={cls.copyBtn}
                        onClick={onCopy}
                    />
                    <code>{text}</code>
                </pre>
            }
            off={
                <pre className={classNames(cls.Code, {}, [className])}>
                    <Button
                        className={cls.copyBtn}
                        variant={ButtonTheme.CLEAR}
                        onClick={onCopy}
                    >
                        <Icon Svg={CopyIconDeprecated} className={cls.icon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Code.displayName = 'Code';
