import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "entities/Profile";
import { ThunkConfig } from "app/providers/StoreProvider";

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    "profile/fetchProfileData",
    async (profileId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Profile>(`/profile/${profileId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue("error");
        }
    }
);