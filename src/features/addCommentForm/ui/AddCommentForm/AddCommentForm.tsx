import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./AddCommentForm.module.scss"
import { Input } from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";
import { ButtonTheme } from "@/shared/ui/Button";
import { useSelector } from "react-redux";
import { getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slice/addCommentFormSlice";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { HStack } from "@/shared/ui/Stack";

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const text = useSelector(getAddCommentFormText);
    // const error = useSelector(getAddCommentFormError);

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text);
        onCommentTextChange("");
    }, [onSendComment, onCommentTextChange, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack justify="between" max className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    placeholder={t("enter_your_comment")}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    onClick={onSendHandler}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t("send_comment")}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
AddCommentForm.displayName = "AddCommentForm"

export default AddCommentForm;