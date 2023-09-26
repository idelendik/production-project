import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginForm.module.scss"
import { Button } from "shared/ui/Button";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input";
import { memo, useCallback, useEffect } from "react";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../index";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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
        <DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
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
        </DynamicModuleLoader>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
LoginForm.displayName = "LoginForm";

export default LoginForm;