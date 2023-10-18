import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticleDetailsPage.module.scss"
import { memo } from "react";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();

    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t("article_with_this_id_not_found")}
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArticleDetailsPage);