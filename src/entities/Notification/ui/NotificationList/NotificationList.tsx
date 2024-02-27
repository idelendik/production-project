import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
    const { isLoading, data } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                gap={'16'}
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width={'100%'} border={'8px'} height={'80px'} />
                <Skeleton width={'100%'} border={'8px'} height={'80px'} />
                <Skeleton width={'100%'} border={'8px'} height={'80px'} />
            </VStack>
        );
    }

    return (
        <VStack
            gap={'16'}
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
NotificationList.displayName = 'NotificationList';
