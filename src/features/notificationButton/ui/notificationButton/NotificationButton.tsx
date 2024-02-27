import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NotificationButton.module.scss';
import { Icon } from '@/shared/ui/deprecated/Icon';
import NotificationsIcon from '@/shared/assets/icons/notifications-icon.svg';
import { NotificationList } from '@/entities/Notification';
import { Popover } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

import { BrowserView, MobileView } from 'react-device-detect';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(
    ({ className }: NotificationButtonProps) => {
        const [isOpen, setIsOpen] = useState(false);

        const onOpenDrawer = useCallback(() => {
            setIsOpen(true);
        }, []);

        const onCloseDrawer = useCallback(() => {
            setIsOpen(false);
        }, []);

        const trigger = (
            <div className={cls.notificationsIcon} onClick={onOpenDrawer}>
                <Icon Svg={NotificationsIcon} />
            </div>
        );

        return (
            <div>
                <BrowserView>
                    <Popover
                        className={classNames(cls.NotificationButton, {}, [
                            className,
                        ])}
                        direction={'bottom left'}
                        trigger={trigger}
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                </BrowserView>

                <MobileView>
                    {trigger}
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        <NotificationList />
                    </Drawer>
                </MobileView>
            </div>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
NotificationButton.displayName = 'NotificationButton';
