import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "entities/Profile";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country/model/types/country";

const defaultProfile: Profile = {
    firstname: "",
    lastname: "",
    age: -1,
    avatar: "",
    city: "",
    country: Country.Belarus,
    currency: Currency.BYN,
    username: ""
};

export const getProfileData = (state: StateSchema): Profile => state?.profile?.data || defaultProfile;