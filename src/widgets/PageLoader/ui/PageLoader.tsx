import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./PageLoader.module.scss"
import React from "react";
import { Loader } from "@/shared/ui/Loader";

interface PageLoaderProps {
    className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => {
    return (
        <span className={classNames(cls.PageLoader,{}, [className])}>
            <Loader />
        </span>
    );
};