import { Profile } from "entities/Profile"
import { profileActions, profileReducer } from "./profileSlice";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/editableProfileCardSchema";
import { ValidateProfileError } from "../consts/consts";

const data: Profile = {
    username: "test",
    firstname: "test",
    lastname: "test",
    age: 30,
    city: "test",
    country: Country.India,
    currency: Currency.CNY,
    avatar: "",
}

describe("profileSlice", () => {
    test("set readonly", () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };

        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });

    test("cancel edit", () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { firstname: " " } };

        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            readonly: true,
            form: data,
            data,
            validateErrors: undefined,
        });
    });

    test("update profile", () => {
        const state: DeepPartial<ProfileSchema> = { form: { firstname: "test" } };

        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ firstname: "test1" }))).toEqual({
            form: { firstname: "test1" }
        });
    });

    test("update profile service pending", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        };

        expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test("update profile service fulfilled", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ""))).toEqual({
            data: data,
            form: data,
            isLoading: false,
            readonly: true,
            validateErrors: undefined,
        });
    });
})