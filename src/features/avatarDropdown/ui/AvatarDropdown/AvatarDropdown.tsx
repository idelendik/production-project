import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./AvatarDropdown.module.scss"
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Dropdown } from "shared/ui/Popups";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { useTranslation } from "react-i18next";

interface AvatarDropdownProps {
    className?: string
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

    return (
        <Dropdown
            className={classNames(cls.AvatarDropdown, {}, [className])}
            items={[
                ...(isAdminPanelAvailable ? [{ content: t("admin"), href: RoutePath.admin_panel }] : []),
                { content: t("Profile"), href: `${RoutePath.profile}${authData.id}` },
                { content: t("Logout"), onClick: onLogout },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
            direction="bottom left"
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
AvatarDropdown.displayName = "AvatarDropdown"