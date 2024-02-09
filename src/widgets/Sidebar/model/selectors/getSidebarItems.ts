import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import HomeIcon from "@/shared/assets/icons/home-icon.svg";
import AboutIcon from "@/shared/assets/icons/about-icon.svg";
import ProfileIcon from "@/shared/assets/icons/profile-icon.svg";
import ArticlesIcon from "@/shared/assets/icons/articles-icon.svg";
import { SidebarItemType } from "../../model/types/sidebar";
import { RoutePath } from "@/shared/const/router";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userAuthData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: "Main",
                Icon: HomeIcon,
            },
            {
                path: RoutePath.about,
                text: "About",
                Icon: AboutIcon,
            },

        ];

        if (userAuthData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userAuthData.id,
                    text: "Profile",
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    text: "Articles",
                    Icon: ArticlesIcon,
                    authOnly: true,
                }
            );
        }

        return sidebarItemsList;
    }
)