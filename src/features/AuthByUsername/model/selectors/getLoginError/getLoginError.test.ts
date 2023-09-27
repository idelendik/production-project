import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getLoginError } from "./getLoginError";

describe("getLoginError", () => {
    test("should return correct error value", () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: "An error"
            }
        };
        expect(getLoginError(state as StateSchema)).toEqual("An error");
    })

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginError(state as StateSchema)).toEqual("");
    })
})