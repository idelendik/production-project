import { memo } from 'react';

import { MainLayout } from '../MainLayout';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
    return (
        <MainLayout
            header={
                <HStack className={cls.header}>
                    <Skeleton width={40} height={40} border={'50%'} />
                </HStack>
            }
            content={
                <VStack gap={'16'} style={{ height: '100%' }}>
                    <Skeleton width={'70%'} height={32} border={'16'} />
                    <Skeleton width={'40%'} height={20} border={'16'} />
                    <Skeleton width={'50%'} height={20} border={'16'} />
                    <Skeleton width={'30%'} height={32} border={'16'} />
                    <Skeleton width={'80%'} height={'40%'} border={'16'} />
                    <Skeleton width={'80%'} height={'40%'} border={'16'} />
                </VStack>
            }
            sidebar={<Skeleton width={220} height={'100%'} border={'32px'} />}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
AppLoaderLayout.displayName = 'AppLoaderLayout';
