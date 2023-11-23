import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui/Text/Text";
import { ArticleList } from "entities/Article";
import { VStack } from "shared/ui/Stack";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
        return null; // TODO: Return specific messages/components instead
    }

    return (
        <VStack gap="8" className={classNames("", {}, [className])}>
            <Text
                size={TextSize.L}
                text={t("recommendations_text")}
            />

            <ArticleList
                target="_blank"
                articles={articles}
                virtualised={false}
            />
        </VStack>
    )
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleRecommendationsList.displayName = "ArticleRecommendationsList"