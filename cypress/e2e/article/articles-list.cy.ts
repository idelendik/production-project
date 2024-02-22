describe("A user opens Articles page", () => {
    it("and articles load successfully", () => {
        cy.login().then(()=> {
            cy.visit("/articles");

            cy.getByTestId("ArticleList").should("exist");
            cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
        })
    })

    it("and change list sorting", () => {
        //data-testid="ArticlesPageFilters.ArticleSortSelector"
    })

    it("and search for", () => {
        cy.createArticle().then((article) => {
            cy.login().visit("articles");

            cy.getByTestId("ArticleList");

            cy.getByTestId("ArticlesPageFilters.Search").type("TESTING");

            cy.getByTestId("ArticleListItem").should("have.length.at.least", 1);

            cy.removeArticle(article.id);
        })
    })

    it("and apply filtering", () => {
        cy.createArticle().then((article) => {
            cy.login().visit("articles");

            cy.getByTestId("ArticleList");

            cy.getByTestId("Tab.business").click();

            cy.getByTestId("ArticleListItem").should("have.length.at.least", 1);

            cy.removeArticle(article.id);
        })
    })
})