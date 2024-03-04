import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleDetails.module.scss';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { memo, useEffect } from 'react';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from '@/shared/ui/deprecated/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';

import ViewsIcon from '@/shared/assets/icons/views-icon.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderArticleBlock';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const ArticleDetailsSkeleton = () => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap={'16'} max>
            <Skeleton
                className={cls.avatar}
                width={200}
                height={200}
                border={'50%'}
            />
            <Skeleton className={cls.title} width={300} height={32} />
            <Skeleton className={cls.skeleton} width={600} height={64} />
            <Skeleton className={cls.skeleton} width={'100%'} height={200} />
            <Skeleton className={cls.skeleton} width={'100%'} height={200} />
        </VStack>
    );
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <Avatar size={200} src={article?.img} className={cls.avatar} />
            </HStack>
            <VStack data-testid="ArticleDetails.Info" gap="4" max>
                <TextDeprecated
                    title={article?.title}
                    text={article?.subtitle}
                    className={cls.title}
                    size={TextSize.L}
                />

                <HStack gap="8" className={cls.articleInfo}>
                    <Icon Svg={ViewsIcon} className={cls.icon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>

                <HStack gap="8" className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text title={article?.title} size={'l'} bold />

            <Text title={article?.subtitle} />

            <AppImage
                src={article?.img}
                className={cls.img}
                fallback={
                    <SkeletonRedesigned
                        width={'100%'}
                        height={420}
                        border={'16px'}
                    />
                }
            />

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [id, dispatch]);

    let content;

    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else if (error) {
        content = (
            <TextDeprecated
                align={TextAlign.CENTER}
                title={t('error_loading_post')}
            />
        );
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleDetails.displayName = 'ArticleDetails';
