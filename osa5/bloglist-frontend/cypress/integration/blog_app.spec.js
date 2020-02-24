describe('Blog app', function() {
  const user = {
    username: 'Asd396',
    password: 'qwerty',
    name: 'Pantsukimies Kotipoltto'
  }

  const blog = {
    title: 'Cypress Rocks',
    url: 'www.twitter.com',
    author: 'Chuck Norris',
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains('Welcome')
      cy.contains('Login succeeded')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('Login failed')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      // ...
    })
  })
})