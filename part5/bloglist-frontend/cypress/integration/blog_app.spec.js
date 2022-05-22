describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'liam baldyga',
      username: 'liamb',
      password: 'gunner'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('liamb')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Invalid login')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('liamb')
      cy.get('#password').type('gunner')
      cy.get('#login-button').click()
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'liamb', password: 'gunner' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('new blog')
      cy.get('#author').type('me')
      cy.get('#url').type('twitter.com')

      cy.contains('create').click()
    })

    it('can like blog', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('new blog')
      cy.get('#author').type('me')
      cy.get('#url').type('twitter.com')

      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('blogs are sorted by likes', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('new blog')
      cy.get('#author').type('me')
      cy.get('#url').type('twitter.com')

      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
      cy.contains('like').click()

      cy.wait(5000)
      cy.contains('new blog').click()

      cy.get('#title').type('second blog')
      cy.get('#author').type('me again')
      cy.get('#url').type('twitter.com')

      cy.contains('create').click()

      cy.contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.contains('1')
    })
  })
})