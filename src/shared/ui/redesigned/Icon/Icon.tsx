import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableBaseProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableBaseProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        clickable,
        Svg,
        width = 32,
        height = 32,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ width, height }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Icon.displayName = 'Icon';
