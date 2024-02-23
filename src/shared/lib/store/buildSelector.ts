import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type Hook<T, Args extends any[]> = (...args: Args) => T;
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function buildSelector<T, Args extends any[]>(
    selector: Selector<T, Args>,
): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useSelector((state: StateSchema) => selector(state, ...args));
    };

    return [useSelectorHook, selector];
}
