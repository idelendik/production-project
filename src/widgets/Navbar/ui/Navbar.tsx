import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";
import { Modal } from "shared/ui/Modal/Modal";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { useCallback, useState } from "react";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.Navbar,{}, [className])}>
            <Button theme={ButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={onToggleModal}>
                {t("Login")}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                {t("Lorem")}
            </Modal>
        </div>
    );
};