import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import AppRouter from "./AppRouter";
import { getRouteAbout, getRouteAdmin, getRouteProfile } from "@/shared/const/router";
import { screen } from "@testing-library/react";
import { UserRole } from "@/entities/User";

describe("app/router/AppRouter", () => {
    test("The page should be rendered", async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        })

        const page = await screen.findByTestId("AboutPage");

        expect(page).toBeInTheDocument();
    })

    test("The page is not found", async () => {
        componentRender(<AppRouter />, {
            route: "/asdfafsad",
        })

        const page = await screen.findByTestId("NotFoundPage");

        expect(page).toBeInTheDocument();
    })

    test("An unauthorized user tries to open a protected page", async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile("1"),
        })

        const page = await screen.findByTestId("MainPage");

        expect(page).toBeInTheDocument();
    })

    test("An authorized user tries to open a protected page", async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile("1"),
            initialState: {
                user: { _inited: true, authData: {} }
            }
        })

        const page = await screen.findByTestId("ProfilePage");

        expect(page).toBeInTheDocument();
    })

    test("Access is not allowed (have no role)", async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: {} }
            }
        })

        const page = await screen.findByTestId("ForbiddenPage");

        expect(page).toBeInTheDocument();
    })

    test("Access is allowed (have a role)", async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } }
            }
        })

        const page = await screen.findByTestId("AdminPanelPage");

        expect(page).toBeInTheDocument();
    })
});