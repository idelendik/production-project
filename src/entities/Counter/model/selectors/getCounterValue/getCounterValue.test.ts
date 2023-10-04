import { getCounterValue } from "./getCounterValue";
import { StateSchema } from "app/providers/StoreProvider";

describe("getCounterValue", () => {
    const state: DeepPartial<StateSchema> = {
        counter: {
            value: 10,
        }
    }
    test("should return a value", () => {
        expect(getCounterValue(state as StateSchema)).toBe(10);
    });
});