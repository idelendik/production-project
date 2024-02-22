describe('Routing', () => {
    describe('for unauthorized user', () => {
        it('to the Main page', () => {
            cy.visit('/');
            cy.getByTestId('MainPage').should('exist');
        });

        it('to the Profile page', () => {
            cy.visit('/profile/1');
            cy.getByTestId('MainPage').should('exist');
        });

        it('to a NotFound page', () => {
            cy.visit('/some-url-that-does-not-exist');
            cy.getByTestId('NotFoundPage').should('exist');
        });
    });

    describe('for authorized user', () => {
        it('to the Profile page', () => {
            cy.login();
            cy.visit('/profile/1');
            cy.getByTestId('ProfilePage').should('exist');
        });

        it('to the Articles page', () => {
            cy.login();
            cy.visit('/articles');
            cy.getByTestId('ArticlesPage').should('exist');
        });
    });
});
