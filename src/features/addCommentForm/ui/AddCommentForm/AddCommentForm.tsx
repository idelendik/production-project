import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AddCommentForm.module.scss';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { useTranslation } from 'react-i18next';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useSelector } from 'react-redux';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
    ({ className, onSendComment }: AddCommentFormProps) => {
        const { t } = useTranslation();

        const dispatch = useAppDispatch();

        const text = useSelector(getAddCommentFormText);
        // const error = useSelector(getAddCommentFormError);

        const onCommentTextChange = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value));
            },
            [dispatch],
        );

        const onSendHandler = useCallback(() => {
            onSendComment(text);
            onCommentTextChange('');
        }, [onSendComment, onCommentTextChange, text]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Card padding={'24'} border={'round'} max>
                            <HStack
                                data-testid="AddCommentForm"
                                justify="between"
                                max
                                gap={'16'}
                                className={classNames(
                                    cls.AddCommentFormRedesigned,
                                    {},
                                    [className],
                                )}
                            >
                                <Input
                                    data-testid="AddCommentForm.Input"
                                    className={cls.input}
                                    placeholder={t('enter_your_comment')}
                                    value={text}
                                    onChange={onCommentTextChange}
                                />
                                <Button
                                    data-testid="AddCommentForm.Button"
                                    onClick={onSendHandler}
                                >
                                    {t('send_comment')}
                                </Button>
                            </HStack>
                        </Card>
                    }
                    off={
                        <HStack
                            data-testid="AddCommentForm"
                            justify="between"
                            max
                            className={classNames(cls.AddCommentForm, {}, [
                                className,
                            ])}
                        >
                            <InputDeprecated
                                data-testid="AddCommentForm.Input"
                                className={cls.input}
                                placeholder={t('enter_your_comment')}
                                value={text}
                                onChange={onCommentTextChange}
                            />
                            <ButtonDeprecated
                                data-testid="AddCommentForm.Button"
                                onClick={onSendHandler}
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('send_comment')}
                            </ButtonDeprecated>
                        </HStack>
                    }
                />
            </DynamicModuleLoader>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
AddCommentForm.displayName = 'AddCommentForm';

export default AddCommentForm;
