import { memo, useCallback, useState } from 'react';

import { Card } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { ButtonSize } from '@/shared/ui/deprecated/Button';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedBackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starCount: number) => void;
    onAccept?: (starCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedBackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    } = props;

    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);

            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

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
            <Input
                data-testid="RatingCard.Input"
                placeholder={t('you_text')}
                value={feedback}
                onChange={setFeedback}
            />
        </>
    );

    return (
        <Card data-testid="RatingCard" className={className} max>
            <VStack align={'center'} gap={'8'} max>
                <Text title={starsCount ? t('Thank you') : title} />
                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap={'32'}>
                        {modalContent}
                        <HStack max gap={'16'} justify={'end'}>
                            <Button
                                data-testid="RatingCard.Close"
                                onClick={cancelHandle}
                                theme={ButtonTheme.OUTLINE_RED}
                            >
                                {t('Close')}
                            </Button>
                            <Button
                                data-testid="RatingCard.Send"
                                onClick={acceptHandle}
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack max gap={'32'}>
                        {modalContent}
                        <Button
                            data-testid="RatingCard.Send"
                            fullWidth
                            size={ButtonSize.L}
                            onClick={acceptHandle}
                        >
                            {t('Send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
RatingCard.displayName = 'RatingCard';
