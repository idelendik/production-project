describe('A user opens Profile page', () => {
    it('and profile loads successfully', () => {
        cy.login().then((data) => {
            cy.visit(`profile/${data.id}`);
        });

        cy.getByTestId('ProfileCard.firstname').should(
            'have.value',
            'TestUser',
        );
    });

    it('and update profile data successfully', () => {
        cy.login().then((data) => {
            const newFirstname = 'new';
            const newLastname = 'lastname';

            cy.updateProfile(newFirstname, newLastname);

            cy.getByTestId('ProfileCard.firstname').should(
                'have.value',
                newFirstname,
            );
            cy.getByTestId('ProfileCard.lastname').should(
                'have.value',
                newLastname,
            );

            cy.resetProfile(data.id);
        });
    });
});
