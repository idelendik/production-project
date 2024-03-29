import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button } from '@/shared/ui/deprecated/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from '../../model/selectors/article';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    ({ className }: ArticleDetailsPageHeaderProps) => {
        const { t } = useTranslation();

        const navigate = useNavigate();

        const article = useSelector(getArticleDetailsData);
        const isUserAllowedToEditArticle = useSelector(getCanEditArticle);

        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [navigate, article]);

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className])}
            >
                <Button onClick={onBackToList}>
                    {t('back_to_atricles_list')}
                </Button>
                {isUserAllowedToEditArticle && (
                    <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>
                        {t('edit_article')}
                    </Button>
                )}
            </HStack>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader';
