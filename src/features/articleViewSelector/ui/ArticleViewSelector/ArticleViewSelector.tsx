import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleViewSelector.module.scss';

import ListIcon from '@/shared/assets/icons/list-icon.svg';
import GridIcon from '@/shared/assets/icons/grid-icon.svg';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

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
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => {
        return () => {
            onViewClick?.(newView);
        };
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    border="round"
                    className={classNames(
                        cls.ArticleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                >
                    <HStack gap="8">
                        {viewTypes.map((viewType, idx) => (
                            <Icon
                                key={idx}
                                clickable
                                onClick={onClick(viewType.view)}
                                Svg={viewType.icon}
                                className={cls.icon}
                                isActive={viewType.view === view}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType, idx) => {
                        return (
                            <ButtonDeprecated
                                onClick={onClick(viewType.view)}
                                key={idx}
                                theme={ButtonTheme.CLEAR}
                                className={classNames('', {
                                    [cls.selected]: viewType.view === view,
                                })}
                                disabled={viewType.view === view}
                            >
                                <IconDeprecated
                                    Svg={viewType.icon}
                                    className={cls.icon}
                                />
                            </ButtonDeprecated>
                        );
                    })}
                </div>
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleViewSelector.displayName = 'ArticleViewSelector';
