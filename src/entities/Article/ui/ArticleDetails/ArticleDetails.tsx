import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticleDetails.module.scss"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { memo, useCallback, useEffect } from "react";

import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";

import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "../../model/selectors/articleDetails";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Avatar } from "shared/ui/Avatar/Avatar";

import ViewsIcon from "shared/assets/icons/views-icon.svg";
import CalendarIcon from "shared/assets/icons/calendar-icon.svg";
import { Icon } from "shared/ui/Icon/Icon";
import { ArticleBlock, ArticleBlockType } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";

interface ArticleDetailsProps {
    className?: string
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent key={block.id} block={block} className={cls.block} />;
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(fetchArticleById(id));
        }
    }, [id, dispatch]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border={"50%"} />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={64} />
                <Skeleton className={cls.skeleton} width={"100%"} height={200} />
                <Skeleton className={cls.skeleton} width={"100%"} height={200} />
            </>
        );
    } else if(error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t("error_loading_post")}
            />
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar size={200} src={article?.img} className={cls.avatar} />
                </div>
                <Text title={article?.title} text={article?.subtitle} className={cls.title} size={TextSize.L} />
                <div className={cls.articleInfo}>
                    <Icon Svg={ViewsIcon} className={cls.icon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true} >
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleDetails.displayName = "ArticleDetails"