import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Comment } from "../../model/types/comment";

import cls from "./CommentCard.module.scss"
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" className={cls.header} />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.header}>
                <Avatar size={30} src={comment.user.avatar} />
                <Text className={cls.username} title={comment.user.username} />
            </div>

            <Text className={cls.text} text={comment.text} />
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CommentCard.displayName = "CommentCard"