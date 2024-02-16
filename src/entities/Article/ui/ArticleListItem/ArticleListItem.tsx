import { HTMLAttributeAnchorTarget, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticleListItem.module.scss"
import { Article, ArticleTextBlock } from "../../model/types/article";
import { Text } from "@/shared/ui/Text";
import { Icon } from "@/shared/ui/Icon";
import ViewsIcon from "@/shared/assets/icons/views-icon.svg";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { ButtonTheme } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { AppLink } from "@/shared/ui/AppLink";
import { ArticleBlockType, ArticleView } from "../../model/consts/consts";
import { getRouteArticleDetails } from "@/shared/const/router";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
    } = props;

    const { t } = useTranslation();

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text text={article.title} className={cls.title} />
                    <Text text={article.type.join(", ")} className={cls.types} />
                    <img src={article.img} alt={article.title} className={cls.img} />
                    {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
                    <div className={cls.footer}>
                        <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                            <Button theme={ButtonTheme.OUTLINE}>{t("read_more")}</Button>
                        </AppLink>
                        <Text text={String(article.views)} className={cls.views} />
                        <Icon Svg={ViewsIcon} className={cls.icon} />
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink target={target} to={getRouteArticleDetails(article.id)} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt={article.title} className={cls.img} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Text text={article.type.join(", ")} className={cls.types} />
                    <Text text={String(article.views)} className={cls.views} />
                    <Icon Svg={ViewsIcon} className={cls.icon} />
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleListItem.displayName = "ArticleListItem"