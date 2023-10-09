import { updateProfileData } from "./updateProfileData";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Profile, ValidateProfileError } from "../../types/profile";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";

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

describe("fetchProfileData.test", () => {
    test("successful", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data: data }));

        const result = await thunk.callTrunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(data);
    })

    test("server error", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callTrunk();

        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
    });

    test("validation error", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, lastname: "" }
            }
        });

        const result = await thunk.callTrunk();

        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    });
})