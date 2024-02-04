import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./NotificationButton.module.scss"
import { Icon } from "shared/ui/Icon/Icon";
import NotificationsIcon from "shared/assets/icons/notifications-icon.svg";
import { NotificationList } from "entities/Notification";
import { Popover } from "shared/ui/Popups";

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction={"bottom left"}
            trigger={(
                <div className={cls.notificationsIcon}>
                    <Icon Svg={NotificationsIcon} />
                </div>
            )}>
            <NotificationList className={cls.notifications} />
        </Popover>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
NotificationButton.displayName = "NotificationButton"