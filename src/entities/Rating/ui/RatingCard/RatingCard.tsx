import { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./RatingCard.module.scss"
import { Card } from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import { ButtonSize } from "@/shared/ui/Button/ui/Button";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedBackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starCount: number) => void;
    onAccept?: (starCount: number, feedback?: string) => void;
}

export const RatingCard = memo(( props: RatingCardProps) => {
    const {
        className,
        title,
        feedBackTitle,
        hasFeedback,
        onCancel,
        onAccept
    } = props;

    const { t } = useTranslation()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState("");

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);

        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [onAccept, starsCount, feedback]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedBackTitle} />
            <Input placeholder={t("you_text")} value={feedback} onChange={setFeedback} />
        </>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align={"center"} gap={"8"}>
                <Text title={title}/>
                <StarRating size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap={"32"}>
                        {modalContent}
                        <HStack max gap={"16"} justify={"end"}>
                            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>{t("Close")}</Button>
                            <Button onClick={acceptHandle}>{t("Send")}</Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack max gap={"32"}>
                        {modalContent}
                        <Button fullWidth size={ButtonSize.L} onClick={acceptHandle}>{t("Send")}</Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
RatingCard.displayName = "RatingCard"