import { selectByTestId } from "../../helpers/selectByTestId";

describe("Routing", () => {
    describe("for unauthorized user", () => {
        it("to the Main page", () => {
            cy.visit("/")
            cy.get(selectByTestId("MainPage")).should("exist");
        })

        it("to the Profile page", () => {
            cy.visit("/profile/1")
            cy.get(selectByTestId("MainPage")).should("exist");
        })

        it("to a NotFound page", () => {
            cy.visit("/asdasdsdasdasd")
            cy.get(selectByTestId("NotFoundPage")).should("exist");
        })
    });

    describe("for authorized user", () => {
        it("to the Profile page", () => {
            cy.login();
            cy.visit("/profile/1")
            cy.get(selectByTestId("ProfilePage")).should("exist");
        })

        it("to the Articles page", () => {
            cy.login("admin", "123");
            cy.visit("/articles")
            cy.get(selectByTestId("ArticlesPage")).should("exist");
        })
    });
})