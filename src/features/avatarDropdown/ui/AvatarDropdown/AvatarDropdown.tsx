import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AvatarDropdown.module.scss';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { useTranslation } from 'react-i18next';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const authData = useSelector(getUserAuthData);

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [{ content: t('admin'), href: getRouteAdmin() }]
            : []),
        { content: t('Settings'), href: getRouteSettings() },
        { content: t('Profile'), href: getRouteProfile(authData.id) },
        { content: t('Logout'), onClick: onLogout },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Dropdown
                    className={classNames(cls.AvatarDropdown, {}, [className])}
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                    direction="bottom left"
                />
            }
            off={
                <DropdownDeprecated
                    className={classNames(cls.AvatarDropdown, {}, [className])}
                    items={items}
                    trigger={
                        <AvatarDeprecated size={30} src={authData.avatar} />
                    }
                    direction="bottom left"
                />
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
AvatarDropdown.displayName = 'AvatarDropdown';
