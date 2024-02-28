import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import HomeIconDeprecated from '@/shared/assets/icons/home-icon.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-icon.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-icon.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles-icon.svg';

import HomeIcon from '@/shared/assets/icons/home-icon-r.svg';
import AboutIcon from '@/shared/assets/icons/about-icon-r.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon-r.svg';
import ArticlesIcon from '@/shared/assets/icons/articles-icon-r.svg';

import { SidebarItemType } from '../../model/types/sidebar';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userAuthData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'Main',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => HomeIcon,
                    off: () => HomeIconDeprecated,
                }),
            },
            {
                path: getRouteAbout(),
                text: 'About',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => AboutIcon,
                    off: () => AboutIconDeprecated,
                }),
            },
        ];

        if (userAuthData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userAuthData.id),
                    text: 'Profile',
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => ProfileIcon,
                        off: () => ProfileIconDeprecated,
                    }),
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    text: 'Articles',
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => ArticlesIcon,
                        off: () => ArticlesIconDeprecated,
                    }),
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
