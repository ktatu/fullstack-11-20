// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createBlog", (blog) => {
    //cy.request("POST", "http://localhost:3003/api/blogs", blog, { auth: getToken() })
    const token = getToken()
    //console.log("token ", token)
    cy.request({ method: "POST", url: "http://localhost:3003/api/blogs", body: blog, auth: { bearer : token } })

})

Cypress.Commands.add("likeBlog", (blogTitle) => {
    cy
        .contains(blogTitle)
        .parent()
        .find(".like-button")
        .click()

})

Cypress.Commands.add("checkForOrder", (blogTitle) => {
    cy
        .get("#blog-title")
        .contains(blogTitle)
})

const getToken = () => JSON.parse(localStorage.getItem("loggedUser"))["token"]