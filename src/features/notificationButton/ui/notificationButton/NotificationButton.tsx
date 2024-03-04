import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NotificationButton.module.scss';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationsIcon from '@/shared/assets/icons/notifications-icon-r.svg';
import { NotificationList } from '@/entities/Notification';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

import { BrowserView, MobileView } from 'react-device-detect';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Icon
                        className={cls.notificationsIcon}
                        Svg={NotificationsIcon}
                        clickable
                        onClick={onOpenDrawer}
                        width={30}
                        height={30}
                    />
                }
                off={
                    <div
                        className={cls.notificationsIcon}
                        onClick={onOpenDrawer}
                    >
                        <IconDeprecated Svg={NotificationsIcon} />
                    </div>
                }
            />
        );

        return (
            <div>
                <BrowserView>
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Popover
                                className={classNames(
                                    cls.NotificationButton,
                                    {},
                                    [className],
                                )}
                                direction={'bottom left'}
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </Popover>
                        }
                        off={
                            <PopoverDeprecated
                                className={classNames(
                                    cls.NotificationButton,
                                    {},
                                    [className],
                                )}
                                direction={'bottom left'}
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </PopoverDeprecated>
                        }
                    />
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
