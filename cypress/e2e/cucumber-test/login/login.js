import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"

Given('User is at the sign in page', () => {
    cy.visit('https://account.bbc.com/auth?realm=%2F&clientId=Account&ptrt=https%3A%2F%2Fwww.bbc.co.uk%2Fweather%2F2643743&userOrigin=weather_ps&isCasso=false&action=sign-in&redirectUri=https%3A%2F%2Fsession.bbc.co.uk%2Fsession%2Fcallback%3Frealm%3D%2F&service=IdSignInService&nonce=MVN9q6yc-yp9dLYITYxUXF_LfvMe4KAAz9Fk')
})

When('User enters username as {string} and password as {string}', (username, password) => {
    cy.get('#user-identifier-input').type(username).type('{enter}');
    cy.get('#password-input').type(password);
})

And('User clicks on signin button', () => {
    cy.get('#submit-button').click()
})

Then('User is able to successfully signin to the Website', () => {
    cy.get('.ssrcss-1jv2lc5-MastheadText').should('be.visible')
    .and('contain', 'Welcome to the BBC');
})