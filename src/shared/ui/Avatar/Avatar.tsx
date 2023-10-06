import { classNames, Mods } from "shared/lib/classNames/classNames";

import cls from "./Avatar.module.scss"
import { CSSProperties, useMemo } from "react";

import DefaultImg from "./Avatar.jpg";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src = DefaultImg,
        size = 100,
        alt,
    } = props;

    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
        }
    }, [size]);

    return (
        <img
            className={classNames(cls.Avatar, mods, [className])}
            style={styles}
            src={src}
            alt={alt}
        />
    );
};