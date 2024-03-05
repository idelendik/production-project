import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './LoginForm.module.scss';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { useTranslation } from 'react-i18next';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { memo, useCallback, useEffect } from 'react';
import { ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useSelector } from 'react-redux';
import { loginActions } from '../../index';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { loginReducer } from '../../model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        return () => {
            dispatch(loginActions.clearError());
        };
    }, [dispatch]);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [onSuccess, dispatch, username, password, forceUpdate]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack
                        gap={'16'}
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <Text size={'l'} title={t('auth_form_title')} />
                        <p>
                            {t(
                                'Please use the following credentials admin:123',
                            )}
                        </p>
                        {error && (
                            <Text
                                text={t('incorrect_username_password')}
                                variant={'error'}
                            />
                        )}
                        <Input
                            type="text"
                            className={cls.input}
                            value={username}
                            onChange={onChangeUsername}
                            placeholder={t('Username')}
                            autofocus
                        />
                        <Input
                            type="text"
                            className={cls.input}
                            value={password}
                            onChange={onChangePassword}
                            placeholder={t('Password')}
                        />
                        <Button
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Login')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('auth_form_title')} />
                        <p>
                            {t(
                                'Please use the following credentials admin:123',
                            )}
                        </p>
                        {error && (
                            <TextDeprecated
                                text={t('incorrect_username_password')}
                                theme={TextTheme.ERROR}
                            />
                        )}
                        <InputDeprecated
                            type="text"
                            className={cls.input}
                            value={username}
                            onChange={onChangeUsername}
                            placeholder={t('Username')}
                            autofocus
                        />
                        <InputDeprecated
                            type="text"
                            className={cls.input}
                            value={password}
                            onChange={onChangePassword}
                            placeholder={t('Password')}
                        />
                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Login')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
LoginForm.displayName = 'LoginForm';

export default LoginForm;
