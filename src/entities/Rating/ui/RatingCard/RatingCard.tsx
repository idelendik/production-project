import { memo, useCallback, useState } from 'react';

import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { useTranslation } from 'react-i18next';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ButtonSize } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedBackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        placeholder={t('you_text')}
                        value={feedback}
                        onChange={setFeedback}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedBackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        placeholder={t('you_text')}
                        value={feedback}
                        onChange={setFeedback}
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align={'center'} gap={'8'} max>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text title={starsCount ? t('Thank you') : title} />}
                    off={
                        <TextDeprecated
                            title={starsCount ? t('Thank you') : title}
                        />
                    }
                />

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
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack max gap={'16'} justify={'end'}>
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        variant={'outline'}
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
                            }
                            off={
                                <HStack max gap={'16'} justify={'end'}>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        theme={ButtonTheme.OUTLINE_RED}
                                    >
                                        {t('Close')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandle}
                                    >
                                        {t('Send')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack max gap={'32'}>
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <Button
                                    data-testid="RatingCard.Send"
                                    fullWidth
                                    size={'l'}
                                    onClick={acceptHandle}
                                >
                                    {t('Send')}
                                </Button>
                            }
                            off={
                                <ButtonDeprecated
                                    data-testid="RatingCard.Send"
                                    fullWidth
                                    size={ButtonSize.L}
                                    onClick={acceptHandle}
                                >
                                    {t('Send')}
                                </ButtonDeprecated>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    border={'round'}
                    padding={'24'}
                    data-testid="RatingCard"
                    className={className}
                    max
                >
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    data-testid="RatingCard"
                    className={className}
                    max
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
RatingCard.displayName = 'RatingCard';
