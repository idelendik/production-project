import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";

import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Avatar } from "shared/ui/Avatar/Avatar";


interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const dispatch = useDispatch();

    const authData = useSelector(getUserAuthData);

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvailable = isAdmin || isManager;

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar,{}, [className])}>
                <Text className={cls.appName} title={t("production_project")} theme={TextTheme.INVERTED} />

                <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={cls.createBtn}>{t("new_article")}</AppLink>

                <Dropdown
                    className={cls.dropdown}
                    items={[
                        ...(isAdminPanelAvailable ? [{ content: t("admin"), href: RoutePath.admin_panel }] : []),
                        { content: t("Profile"), href: `${RoutePath.profile}${authData.id}` },
                        { content: t("Logout"), onClick: onLogout },
                    ]}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                    direction="bottom left"
                />
            </header>
        )
    }

    return (
        <header className={classNames(cls.Navbar,{}, [className])}>
            <Button theme={ButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                {t("Login")}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Navbar.displayName = "Navbar";