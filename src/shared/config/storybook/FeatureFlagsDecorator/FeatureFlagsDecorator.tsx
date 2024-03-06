import { Story } from '@storybook/react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeatureFlagsDecorator =
    // eslint-disable-next-line react/display-name
    (features: FeatureFlags) => (StoryComponent: Story) => {
        setFeatureFlags(features);

        return <StoryComponent />;
    };
