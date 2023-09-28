import React from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

import HomeIcon from "shared/assets/icons/home-icon.svg";
import AboutIcon from "shared/assets/icons/about-icon.svg";
import ProfileIcon from "shared/assets/icons/profile-icon.svg";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
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
    }
]