import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import { EditableProfileCard } from "./editableProfileCard";
import { screen } from "@testing-library/react";
import { Profile } from "entities/Profile";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { profileReducer } from "../../model/slice/profileSlice";
import userEvent from "@testing-library/user-event";
import { $api } from "shared/api/api";


const profile: Profile = {
    id: "1",
    firstname: "admin",
    lastname: "admin",
    age: 50,
    currency: Currency.CNY,
    country: Country.India,
    city: "Minsk",
    username: "admin213",
    avatar: "asd"
}

const options = {
    initialState: {
        profile: {
            readonly: true,
            form: profile,
            data: profile,
        },
        user: {
            authData: {
                id: "1",
                username: "admin"
            }
        }
    },
    asyncReducers: {
        profile: profileReducer
    },
};

describe("features/EditableProfileCard", () => {
    test("switches from readonly to edit mode", async () => {
        componentRender(<EditableProfileCard id={"1"} />, options);

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

        expect(screen.getByTestId("EditableProfileCardHeader.CancelButton")).toBeInTheDocument();
    });

    test("return to the initial state if editing is cancelled", async () => {
        componentRender(<EditableProfileCard id={"1"} />, options);

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

        await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
        await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

        await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "123");
        await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "456");

        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("123");
        expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("456");

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.CancelButton"));

        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue(options.initialState.profile.data.firstname);
        expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue(options.initialState.profile.data.lastname);
    });

    test("shows validation error if firstname is empty", async () => {
        componentRender(<EditableProfileCard id={"1"} />, options);

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

        await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"));

        expect(screen.getByTestId("EditableProfileCard.Error.Paragraph")).toBeInTheDocument();
    });

    test("sends a PUT request if no validation errors", async () => {
        const mockPutReq = jest.spyOn($api, "put")

        componentRender(<EditableProfileCard id={"1"} />, options);

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

        await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));

        await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"));

        expect(mockPutReq).toHaveBeenCalled();
    });
})