import { getProfileForm } from './getProfileForm';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileForm.test', () => {
    test('should work with filled state', () => {
        const data = {
            username: 'admin',
            age: 30,
            country: Country.India,
            lastname: 'D.',
            firstname: 'Igor',
            city: 'Minsk',
            currency: Currency.CNY,
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
