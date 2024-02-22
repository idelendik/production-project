describe("A user visits an Article Details page", () => {
    it.skip("and sees an article content", () => {
        cy.createArticle().then((article) => {
            cy.login().visit(`articles/${article.id}`);

            cy.getByTestId("ArticleDetails.Info").should("exist");

            cy.removeArticle(article.id);
        });
    });

    it.skip("and sees a list of recommended articles", () => {
        cy.createArticle().then((article) => {
            cy.login().visit(`articles/${article.id}`);

            cy.getByTestId("ArticleRecommendationsList").should("exist");

            cy.removeArticle(article.id);
        });
    })

    it.skip("and sends a new comment", () => {
        cy.createArticle().then((article) => {
            cy.login().visit(`articles/${article.id}`);

            cy.getByTestId("ArticleDetails.Info")

            cy.getByTestId("AddCommentForm").scrollIntoView();

            cy.addComment("text");

            cy.getByTestId("CommentCard").should("have.length", 1);

            cy.removeArticle(article.id)
        });
    })

    it("and set a rating", () => {
        cy.createArticle().then((article) => {
            cy.login().visit(`articles/${article.id}`);

            cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" })

            cy.getByTestId("ArticleDetails.Info")

            cy.getByTestId("RatingCard").scrollIntoView();

            cy.setRate(4, "feedback");

            cy.get("[data-selected=true]").should("have.length", 4);

            cy.removeArticle(article.id)
        })
    })
})