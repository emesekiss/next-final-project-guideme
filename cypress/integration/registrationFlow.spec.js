describe('Register and log in user', () => {
  it('Should register and log in the user', () => {
    cy.visit('/');

    // Click and go to register
    cy.get('[data-cy=hamburger-menu]').should('be.visible').click();
    cy.get('[data-cy=go-to-register]').click();

    // Enter registration information
    // Enter username
    cy.get('[data-cy=username]').type('emike');
    // Enter password
    cy.get('[data-cy=password]').type('emike');
    // Register and go to login
    cy.get('[data-cy=register-user]').click();
    cy.location('pathname').should('match', /\/login/);

    // Enter username
    cy.get('[data-cy=username]').type('emike');
    // Enter password
    cy.get('[data-cy=password]').type('emike');
    cy.get('[data-cy=login]').click();
    cy.location('pathname').should('match', /\/profile/);

    // Delete Account
    cy.get('[data-cy=delete-profile]').click();
  });
});
