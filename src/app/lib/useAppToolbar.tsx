import { AppRoutes } from '@/shared/const/router';
import { ReactElement } from 'react';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.MAIN]: <div>MAIN</div>,
        [AppRoutes.ABOUT]: <div>ABOUT</div>,
    };

    return toolbarByAppRoute[appRoute];
}
