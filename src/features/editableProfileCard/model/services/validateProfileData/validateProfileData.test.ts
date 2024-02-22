import { validateProfileData } from './validateProfileData';
import { Profile } from '@/entities/Profile';
import { Country } from '@/entities/Country';
import { ValidateProfileError } from '../../consts/consts';

describe('validateProfileData.test', () => {
    const p: Profile = {};

    test('with undefined Profile', () => {
        const result = validateProfileData();

        expect(result).toEqual([ValidateProfileError.NO_DATA]);
    });

    test('with empty Profile', () => {
        const result = validateProfileData(p);

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('with filled firstname', () => {
        const profileWithFirstname: Profile = { ...p, firstname: 'test' };
        const result = validateProfileData(profileWithFirstname);

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('with filled lastname', () => {
        const profileWithLastname: Profile = { ...p, lastname: 'test' };
        const result = validateProfileData(profileWithLastname);

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('with filled firstname and lastname', () => {
        const profileWithFirstnameLastname: Profile = {
            ...p,
            firstname: 'test',
            lastname: 'test',
        };
        const result = validateProfileData(profileWithFirstnameLastname);

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('with correct firstname, lastname and age', () => {
        const profileWithFirstnameLastnameAge: Profile = {
            ...p,
            firstname: 'test',
            lastname: 'test',
            age: 20,
        };
        const result = validateProfileData(profileWithFirstnameLastnameAge);

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('with correct firstname, lastname, age and country', () => {
        const defaultProfileWithAllRequirePropsFilled: Profile = {
            ...p,
            firstname: 'test',
            lastname: 'test',
            age: 20,
            country: Country.Belarus,
        };
        const result = validateProfileData(
            defaultProfileWithAllRequirePropsFilled,
        );

        expect(result).toEqual([]);
    });
});
