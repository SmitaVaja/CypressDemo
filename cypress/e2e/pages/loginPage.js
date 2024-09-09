class loginPage {

    usernameInput() {
        return cy.get('#user-identifier-input')
    }

    passwordInput() {
        return cy.get('#password-input')
    }

    loginBtn() {
        return cy.get('#submit-button')
    }
}
export default loginPage