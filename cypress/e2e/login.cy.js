describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("Please login")
    })
})

const cypressUser = {
    username: "cypressUser",
    name: "cypressName",
    password: "cypressPassword"
}

describe("Login", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.request("POST", "http://localhost:3003/api/users", cypressUser)
        cy.visit("http://localhost:3000")
    })

    it("succeeds with correct credentials", function() {
        cy
            .get("#username-input")
            .type(cypressUser.username)

        cy
            .get("#password-input")
            .type(cypressUser.password)

        cy
            .get("#login-button")
            .click()

        cy.contains(`${cypressUser.name} logged in`)
    })

    it("fails with wrong credentials", function() {
        cy
            .get("#username-input")
            .type(cypressUser.username)

        cy
            .get("#password-input")
            .type("incorrect-password")

        cy
            .get("#login-button")
            .click()

        cy.contains("invalid username or password")
    })
})
