import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    ({ className }: EditableProfileCardHeaderProps) => {
        const { t } = useTranslation('profilePageHeader');

        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;

        const readonly = useSelector(getProfileReadonly);

        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card border={'partial'} max padding={'24'}>
                        <HStack
                            max={true}
                            justify="between"
                            className={classNames('', {}, [className])}
                        >
                            <Text size={'l'} title={t('profile')} />
                            {canEdit && (
                                <>
                                    {readonly ? (
                                        <Button
                                            onClick={onEdit}
                                            data-testid={
                                                'EditableProfileCardHeader.EditButton'
                                            }
                                        >
                                            {t('edit')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                data-testid={
                                                    'EditableProfileCardHeader.CancelButton'
                                                }
                                                color={'error'}
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <Button
                                                onClick={onSave}
                                                data-testid={
                                                    'EditableProfileCardHeader.SaveButton'
                                                }
                                                color={'success'}
                                            >
                                                {t('save')}
                                            </Button>
                                        </HStack>
                                    )}
                                </>
                            )}
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        max={true}
                        justify="between"
                        className={classNames('', {}, [className])}
                    >
                        <TextDeprecated title={t('profile')} />
                        {canEdit && (
                            <>
                                {readonly ? (
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onEdit}
                                        data-testid={
                                            'EditableProfileCardHeader.EditButton'
                                        }
                                    >
                                        {t('edit')}
                                    </ButtonDeprecated>
                                ) : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                            data-testid={
                                                'EditableProfileCardHeader.CancelButton'
                                            }
                                        >
                                            {t('cancel')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={onSave}
                                            data-testid={
                                                'EditableProfileCardHeader.SaveButton'
                                            }
                                        >
                                            {t('save')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            </>
                        )}
                    </HStack>
                }
            />
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
EditableProfileCardHeader.displayName = 'EditableProfileCardHeader';
