import { LoginSchema } from "../types/loginSchema";
import { loginActions, loginReducer } from "./loginSlice";
import { DeepPartial } from "@reduxjs/toolkit";

describe("loginSlice", () => {
    test("set username", () => {
        const state: DeepPartial<LoginSchema> = {
            username: "uname"
        };

        expect(loginReducer(state as LoginSchema, loginActions.setUsername("uname"))).toEqual({ username: "uname" });
    })

    test("set password", () => {
        const state: DeepPartial<LoginSchema> = {
            password: "123"
        };

        expect(loginReducer(state as LoginSchema, loginActions.setPassword("123"))).toEqual({ password: "123" });
    })
})