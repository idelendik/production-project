import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';

import { useTranslation } from 'react-i18next';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { getRouteArticleCreate } from '@/shared/const/router';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    if (authData) {
        return (
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap={'16'} className={cls.actions}>
                            <NotificationButton />

                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
                        <Text
                            className={cls.appName}
                            title={t('production_project')}
                            theme={TextTheme.INVERTED}
                        />

                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                            className={cls.createBtn}
                        >
                            {t('new_article')}
                        </AppLink>

                        <HStack gap={'16'} className={cls.actions}>
                            <NotificationButton />

                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        );
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button
                        variant={'clear'}
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {t('Login')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {t('Login')}
                    </ButtonDeprecated>
                }
            ></ToggleFeatures>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Navbar.displayName = 'Navbar';
