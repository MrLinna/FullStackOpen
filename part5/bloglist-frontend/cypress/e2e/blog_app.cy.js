describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Lutti Maukkainen',
      username: 'lmaukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)


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
    it('and it can be liked', function() {
      cy.createBlog({ title: 'test blog', author: 'author1', url: 'url1' })
      cy.contains('test blog').parent().find('#viewButton').click()
      cy.contains('test blog').parent().should('contain', 'Likes 0').find('#likeButton').click()
      cy.contains('test blog').parent().should('contain', 'Likes 1')
    })
  })
  describe('When there a few blogs in list from two users', function() {
    beforeEach(function() {
      cy.login({ username: 'lmaukkai', password: 'salainen' })
      cy.createBlog({ title: 'SHOULD NOT BE DELETED', author: 'lmaukkai', url: 'URL1' })
      cy.get('#logout-button').click()
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'blog to delete', author: 'mluukkai', url: 'url2' })
    })

    it('The user that added the blog can remove it', function() {
      cy.contains('blog to delete').parent().find('#viewButton').click()
      cy.contains('blog to delete').parent().find('#remove-button').click()
      cy.get('.notification').should('contain', 'blog deleted successfully')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', 'blog to delete')
    })

    it('Only the user that added the blog can see the remove-button', function() {
      cy.contains('SHOULD NOT BE DELETED').parent().find('#viewButton').click()
      cy.contains('SHOULD NOT BE DELETED').parent().should('not.contain', '#remove-button')

      cy.contains('blog to delete').parent().find('#viewButton').click()
      cy.contains('blog to delete').parent().should('not.contain', '#remove-button')
    })

  })
})
