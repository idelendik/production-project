import { counterReducer, counterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
    test('decrements correctly', () => {
        const state: CounterSchema = { value: 10 };

        expect(counterReducer(state, counterActions.decrement)).toEqual({
            value: 9,
        });
    });

    test('increments correctly', () => {
        const state: CounterSchema = { value: 10 };

        expect(counterReducer(state, counterActions.increment)).toEqual({
            value: 11,
        });
    });

    test('works correctly with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment)).toEqual({
            value: 1,
        });
    });
});
