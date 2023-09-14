import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginForm.module.scss"
import { Button } from "shared/ui/Button";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input";
import { useState } from "react";

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChangeUsernameHandler = (uname: string) => {
        setUsername(uname);
    }

    const onChangePasswordHandler = (pswrd: string) => {
        setPassword(pswrd);
    }

    return (
        <div className={classNames(cls.LoginForm,{}, [className])}>
            <Input type="text" className={cls.input} value={username} onChange={onChangeUsernameHandler} placeholder={t("Username")} autofocus />
            <Input type="text" className={cls.input} value={password} onChange={onChangePasswordHandler} placeholder={t("Password")} />
            <Button className={cls.loginBtn}>{t("Login")}</Button>
        </div>
    );
};