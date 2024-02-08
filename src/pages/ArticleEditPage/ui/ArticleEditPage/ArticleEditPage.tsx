import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticleEditPage.module.scss"
import { Page } from "@/widgets/Page";
import { useParams } from "react-router-dom";
import { Text } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation();

    const { id } = useParams<{id: string}>();

    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {
                isEdit
                    ? <Text title={t("article_edit")} />
                    : <Text title={t("article_create")} />
            }
        </Page>
    );
};

export default memo(ArticleEditPage);