describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('julkinen')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.get('#togglable').find('#newBlog-button').click()
      cy.get('#TitleInput').type('test title')
      cy.get('#AuthorInput').type('test author')
      cy.get('#UrlInput').type('test ulr')
      cy.get('#createButton').click()

      cy.get('.notification').should('contain', 'a new blog test title by test author added')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.infoInvisible').should('contain', 'test title test author')
    })
    describe('When there are blogs in list', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'testblog1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'testblog2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'testblog3', author: 'author3', url: 'url3' })

      })

      it('A blog can be liked', function() {
        cy.contains('testblog2').parent().find('#viewButton').click()
        cy.contains('testblog2').parent().should('contain', 'Likes 0').find('#likeButton').click()
        cy.contains('testblog2').parent().should('contain', 'Likes 1')
      })
    })
  })
})

