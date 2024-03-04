import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleAdditionalInfo.module.scss';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { useTranslation } from 'react-i18next';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { t } = useTranslation();

        const { className, author, createdAt, views, onEdit } = props;

        return (
            <VStack
                gap={'32'}
                className={classNames(cls.ArticleAdditionalInfo, {}, [
                    className,
                ])}
            >
                <HStack gap={'8'}>
                    <Avatar src={author.avatar} size={32} />
                    <Text text={author.username} bold />
                    <Text text={createdAt} />
                </HStack>
                <Button onClick={onEdit}>{t('edit')}</Button>
                <Text
                    text={t('article_views_amount', {
                        count: views,
                    })}
                />
            </VStack>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleAdditionalInfo.displayName = 'ArticleAdditionalInfo';
