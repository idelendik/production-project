import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';
import { memo } from 'react';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'left' | 'center' | 'right';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
    s: cls['size_s'],
    m: cls['size_m'],
    l: cls['size_l'],
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export const Text = memo(
    ({
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
    }: TextProps) => {
        const HeaderTag = mapSizeToHeaderTag[size];
        const sizeClass = mapSizeToClass[size];

        const additionalClasses = [
            className,
            cls[variant],
            cls[align],
            sizeClass,
        ];

        return (
            <div
                className={classNames(
                    cls.Text,
                    { [cls.bold]: bold },
                    additionalClasses,
                )}
            >
                {title && (
                    <HeaderTag
                        data-testid={`${dataTestId}.Header`}
                        className={cls.title}
                    >
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p
                        data-testid={`${dataTestId}.Paragraph`}
                        className={cls.text}
                    >
                        {text}
                    </p>
                )}
            </div>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Text.displayName = 'Text';
