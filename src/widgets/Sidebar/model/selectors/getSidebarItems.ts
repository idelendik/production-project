import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import HomeIcon from "@/shared/assets/icons/home-icon.svg";
import AboutIcon from "@/shared/assets/icons/about-icon.svg";
import ProfileIcon from "@/shared/assets/icons/profile-icon.svg";
import ArticlesIcon from "@/shared/assets/icons/articles-icon.svg";
import { SidebarItemType } from "../../model/types/sidebar";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userAuthData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: "Main",
                Icon: HomeIcon,
            },
            {
                path: getRouteAbout(),
                text: "About",
                Icon: AboutIcon,
            },

        ];

        if (userAuthData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userAuthData.id),
                    text: "Profile",
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    text: "Articles",
                    Icon: ArticlesIcon,
                    authOnly: true,
                }
            );
        }

        return sidebarItemsList;
    }
)