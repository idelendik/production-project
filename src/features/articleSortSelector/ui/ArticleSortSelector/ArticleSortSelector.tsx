import { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticleSortSelector.module.scss"
import { Select, SelectOption } from "@/shared/ui/Select";
import { useTranslation } from "react-i18next";
import { SortOrder } from "@/shared/types";
import { ArticleSortField } from "@/entities/Article";


interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort
    } = props;
    const { t } = useTranslation();

    const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t("created_date")
        },
        {
            value: ArticleSortField.TITLE,
            content: t("title")
        },
        {
            value: ArticleSortField.VIEWS,
            content: t("views")
        }
    ], [t]);

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: "asc",
            content: t("A-Z")
        },
        {
            value: "desc",
            content: t("Z-A")
        }
    ], [t]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select onChange={onChangeSort} value={sort} label={t("sort_by")} options={sortOptions} />
            <Select onChange={onChangeOrder} value={order} label={t("order_by")} options={orderOptions} />
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleSortSelector.displayName = "ArticleSortSelector"