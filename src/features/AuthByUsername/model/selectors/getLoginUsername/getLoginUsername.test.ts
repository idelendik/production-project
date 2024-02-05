import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsername", () => {
    test("should return correct error value", () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: "uname"
            }
        };
        expect(getLoginUsername(state as StateSchema)).toBe("uname");
    })

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toBe("");
    })
})