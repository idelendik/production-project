import React from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

import HomeIcon from "shared/assets/icons/home-icon.svg";
import AboutIcon from "shared/assets/icons/about-icon.svg";
import ProfileIcon from "shared/assets/icons/profile-icon.svg";
import ArticlesIcon from "shared/assets/icons/articles-icon.svg";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
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
    {
        path: RoutePath.profile,
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
]