import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card padding={'24'} max>
            <VStack gap={'32'} max>
                <HStack max justify={'center'}>
                    <Skeleton border={'100%'} width={128} height={128} />
                </HStack>
                <HStack gap={'32'} max>
                    <VStack gap={'16'} max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>
                    <VStack gap={'16'} max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profileCard');

    return (
        <HStack justify="center" max>
            <Text
                variant={'error'}
                title={t('error_title')}
                text={t('error_text')}
                align={'center'}
            />
        </HStack>
    );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname = () => {},
        onChangeLastname = () => {},
        onChangeAge = () => {},
        onChangeCity = () => {},
        onChangeUsername = () => {},
        onChangeAvatar = () => {},
        onChangeCurrency = () => {},
        onChangeCountry = () => {},
    } = props;

    const { t } = useTranslation('profileCard');

    return (
        <Card border={'partial'} padding="24" max className={className}>
            <VStack gap="32">
                {data?.avatar && (
                    <HStack justify="center" max>
                        <Avatar size={128} src={data.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.firstname || ''}
                            label={t('your_firstname')}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            data-testid={'ProfileCard.firstname'}
                        />
                        <Input
                            value={data?.lastname || ''}
                            label={t('your_lastname')}
                            onChange={onChangeLastname}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            value={data?.age || 0}
                            label={t('your_age')}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city || ''}
                            label={t('your_city')}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.username || ''}
                            label={t('your_username')}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar || ''}
                            label={t('your_avatar')}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ProfileCardRedesigned.displayName = 'ProfileCardRedesigned';
