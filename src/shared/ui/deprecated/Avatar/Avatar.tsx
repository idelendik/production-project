import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from 'react';

import DefaultImg from './Avatar.jpg';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';

import ProfileDefaultIcon from '../../../assets/icons/profile-default-icon.svg';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src = '', size = 100, alt } = props;

    const imageOrDefault = src.length > 0 ? src : DefaultImg;

    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
        };
    }, [size]);

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = (
        <Icon width={size} height={size} Svg={ProfileDefaultIcon} />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            className={classNames(cls.Avatar, mods, [className])}
            style={styles}
            src={imageOrDefault}
            alt={alt}
        />
    );
};
