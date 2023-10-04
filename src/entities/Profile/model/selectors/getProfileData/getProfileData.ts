import { StateSchema } from "app/providers/StoreProvider";
import { Profile } from "entities/Profile";
import { Country, Currency } from "shared/consts/common";

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