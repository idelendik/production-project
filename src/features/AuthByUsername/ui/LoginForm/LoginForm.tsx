import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginForm.module.scss"
import { Button } from "shared/ui/Button";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input";
import { memo, useCallback, useEffect } from "react";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../index";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text";

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const {
        username,
        password,
        isLoading,
        error,
    } = useSelector(getLoginState);


    useEffect(() => {
        return () => {
            dispatch(loginActions.clearError());
        }
    }, [dispatch]);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }))
    }, [dispatch, username, password]);

    return (
        <div className={classNames(cls.LoginForm,{}, [className])}>
            <Text title={t("auth_form_title")} />
            {error && <Text text={t("incorrect_username_password")} theme={TextTheme.ERROR}/>}
            <Input
                type="text"
                className={cls.input}
                value={username}
                onChange={onChangeUsername}
                placeholder={t("Username")}
                autofocus
            />
            <Input
                type="text"
                className={cls.input}
                value={password}
                onChange={onChangePassword}
                placeholder={t("Password")}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t("Login")}
            </Button>
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
LoginForm.displayName = "LoginForm";