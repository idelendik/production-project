import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticleRating.module.scss"
import { RatingCard } from "@/entities/Rating";
import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi";
import { getUserAuthData } from "@/entities/User";
import { useSelector } from "react-redux";
import { Skeleton } from "@/shared/ui/Skeleton";

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId
    } = props;

    const userData = useSelector(getUserAuthData);

    const {
        data,
        isLoading
    } = useGetArticleRating({
        articleId,
        userId: userData?.id || ""
    });

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id || "",
                articleId,
                rate: starsCount,
                feedback,
            })
        } catch (e) {
            // should be handled
            console.log(e);
        }
    }, [rateArticleMutation, articleId, userData?.id]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback)
    }, [handleRateArticle]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount)
    }, [handleRateArticle]);

    if(isLoading) {
        return <Skeleton width={"100%"} height={"120px"} />
    }

    return (
        <RatingCard
            className={classNames(cls.ArticleRating, {}, [className])}
            title={"Rate this article"}
            feedBackTitle={"Please leave your review"}
            hasFeedback
            rate={data?.[0]?.rate}
            onAccept={onAccept}
            onCancel={onCancel}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleRating.displayName = "ArticleRating";

export default ArticleRating;