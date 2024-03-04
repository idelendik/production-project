import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = ({ className }: SettingsPageProps) => {
    return (
        <Page data-testid="SettingsPage" className={className}>
            <VStack gap={'16'}>
                <Text title={'SettingsPage'} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
};

export default SettingsPage;
