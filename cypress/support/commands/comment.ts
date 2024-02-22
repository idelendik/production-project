export const addComment = (commentText: string) => {
    cy.getByTestId('AddCommentForm.Input').type(commentText);
    cy.getByTestId('AddCommentForm.Button').click();
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            addComment(text: string): void;
        }
    }
}
