import { getProfileError } from "./getProfileError";
import { StateSchema } from "@/app/providers/StoreProvider";

describe("getProfileError.test", () => {
    test("should work with filled state", () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: "errorText"
            }
        }
        expect(getProfileError(state as StateSchema)).toEqual( "errorText")
    });

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    });
})