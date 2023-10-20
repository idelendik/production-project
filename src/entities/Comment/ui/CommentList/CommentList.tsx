import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Comment } from "../../model/types/comment";

import cls from "./CommentList.module.scss"
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
    const { t } = useTranslation();

    if(isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        )
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ? comments.map(comment => <CommentCard key={comment.id} isLoading={isLoading} className={cls.comment} comment={comment} />) : <Text text={t("no_comments_found")} />}
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CommentList.displayName = "CommentList"