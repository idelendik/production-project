import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticleViewSelector.module.scss"
import { ArticleView } from "../../model/types/article";

import ListIcon from "shared/assets/icons/list-icon.svg";
import GridIcon from "shared/assets/icons/grid-icon.svg";
import { Button } from "shared/ui/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { ButtonTheme } from "shared/ui/Button/ui/Button";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: GridIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    }
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => {
        return () => {
            onViewClick?.(newView);
        }
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType, idx) => {
                return (
                    <Button
                        onClick={onClick(viewType.view)}
                        key={idx}
                        theme={ButtonTheme.CLEAR}
                        className={classNames("", { [cls.selected]: viewType.view === view })}
                        disabled={viewType.view === view}
                    >
                        <Icon Svg={viewType.icon} className={cls.icon} />
                    </Button>
                )
            })}
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleViewSelector.displayName = "ArticleViewSelector"