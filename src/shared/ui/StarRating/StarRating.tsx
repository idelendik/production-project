import { memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./StarRating.module.scss"

import RatingStarIcon from "@/shared/assets/icons/rating-star-icon.svg";
import { Icon } from "@/shared/ui/Icon/Icon";

interface StarRatingProps {
    className?: string;
    onSelect?: (startsCount: number) => void;
    size?: number;
    selectedStarts?: number;
}

const stars = [1,2,3,4,5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        onSelect,
        size = 30,
        selectedStarts = 0
    } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(0);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStarts));

    const onHover = (starsCount: number) => () => {
        if(!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if(!isSelected) {
            onSelect?.(selectedStarts);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    }

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => <Icon
                className={classNames(
                    cls.starIcon,
                    {
                        [cls.selected]: isSelected,
                        [cls.hovered]: currentStarsCount >= starNumber
                    } ,
                    [])}
                key={starNumber}
                Svg={RatingStarIcon}
                width={size}
                height={size}
                onMouseLeave={onLeave}
                onMouseEnter={onHover(starNumber)}
                onClick={onClick(starNumber)}
            />)}
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
StarRating.displayName = "StarRating"