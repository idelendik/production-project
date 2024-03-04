import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StarRating.module.scss';

import RatingStarIconDeprecated from '@/shared/assets/icons/rating-star-icon.svg';
import RatingStarIcon from '@/shared/assets/icons/rating-star-icon-r.svg';
import { Icon as IconDeprecated } from '../Icon/Icon';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

interface StarRatingProps {
    className?: string;
    onSelect?: (startsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(currentStarsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => cls.StarRating,
                    off: () => cls.StarRatingRedesigned,
                }),
                {},
                [className],
            )}
        >
            {stars.map((starNumber, idx) => {
                const commonProps = {
                    'data-testid': `StarRating.${starNumber}`,
                    'data-selected': currentStarsCount >= starNumber,
                    className: classNames(
                        cls.starIcon,
                        {
                            [cls.selected]: isSelected,
                            [cls.hovered]: currentStarsCount >= starNumber,
                        },
                        [],
                    ),
                    key: starNumber,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                };
                return (
                    <ToggleFeatures
                        key={idx}
                        feature="isAppRedesigned"
                        on={
                            <Icon
                                clickable={!isSelected}
                                Svg={RatingStarIcon}
                                {...commonProps}
                            />
                        }
                        off={
                            <IconDeprecated
                                Svg={RatingStarIconDeprecated}
                                {...commonProps}
                            />
                        }
                    />
                );
            })}
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
StarRating.displayName = 'StarRating';
