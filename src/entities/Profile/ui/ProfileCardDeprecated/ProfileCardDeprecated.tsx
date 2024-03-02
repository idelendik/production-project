import { memo } from 'react';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedSkeleton = () => {
    return (
        <HStack
            justify="center"
            max
            className={classNames(
                cls.ProfileCardDeprecated,
                { [cls.loading]: true },
                [],
            )}
        >
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profileCard');

    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCardDeprecated, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('error_title')}
                text={t('error_text')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.ProfileCardDeprecated, mods, [className])}
        >
            <HStack justify="center" max className={cls.avatarWrapper}>
                <AvatarDeprecated src={data?.avatar} />
            </HStack>
            <InputDeprecated
                value={data?.firstname || ''}
                placeholder={t('your_firstname')}
                className={cls.input}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid={'ProfileCard.firstname'}
            />
            <InputDeprecated
                value={data?.lastname || ''}
                placeholder={t('your_lastname')}
                className={cls.input}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid={'ProfileCard.lastname'}
            />
            <InputDeprecated
                value={data?.age || 0}
                placeholder={t('your_age')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.city || ''}
                placeholder={t('your_city')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.username || ''}
                placeholder={t('your_username')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.avatar || ''}
                placeholder={t('your_avatar')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ProfileCardDeprecated.displayName = 'ProfileCardDeprecated';
