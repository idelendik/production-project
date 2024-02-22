import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional classes', () => {
        const expected = 'someClass class1 class2';

        const actual = classNames('someClass', {}, ['class1', 'class2']);

        expect(actual).toBe(expected);
    });

    test('with mods', () => {
        const expected = 'someClass class1 class2 hovered';

        const actual = classNames('someClass', { hovered: true }, [
            'class1',
            'class2',
        ]);

        expect(actual).toBe(expected);
    });

    test('with false mods', () => {
        const expected = 'someClass class1 class2';

        const actual = classNames('someClass', { hovered: false }, [
            'class1',
            'class2',
        ]);

        expect(actual).toBe(expected);
    });

    test('with undefined mods', () => {
        const expected = 'someClass class1 class2';

        const actual = classNames('someClass', { hovered: undefined }, [
            'class1',
            'class2',
        ]);

        expect(actual).toBe(expected);
    });
});
