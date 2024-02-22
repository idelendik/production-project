import { getProfileValidateErrors } from './getProfileValidateErrors';
import { StateSchema } from '@/app/providers/StoreProvider';

import { ValidateProfileError } from '../../consts/consts';

describe('getProfileValidateErrors.test', () => {
    test('should work with filled state', () => {
        const errors: ValidateProfileError[] = [
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.NO_DATA,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            undefined,
        );
    });
});
