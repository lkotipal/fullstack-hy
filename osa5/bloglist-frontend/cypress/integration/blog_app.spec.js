import login from "../../src/services/login"

describe('Blog app', function() {
  const user1 = {
    username: 'Asd396',
    password: 'qwerty',
    name: 'Pantsukimies Kotipoltto'
  }

  const user2 = {
    username: 'bionicman',
    password: '1234',
    name: 'Adam Jensen'
  }

  const blog = {
    title: 'Cypress Rocks',
    url: 'www.twitter.com',
    author: 'Chuck Norris',
  }

  const bestBlog = {
    title: 'I am the best',
    url: 'www.twitter.com',
    author: 'Chuck Norris',
    likes: 9001,
  }

  const okayBlog = {
    title: 'I am okay',
    url: 'www.twitter.com',
    author: 'Chuck Norris',
    likes: 2,
  }

  const worstBlog = {
    title: 'I am the worst',
    url: 'www.twitter.com',
    author: 'Chuck Norris',
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user1.username)
      cy.get('#password').type(user1.password)
      cy.get('#login-button').click()
      cy.contains('Welcome')
      cy.get('.success').contains('Login succeeded')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user1.username)
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.get('.error').contains('Login failed')
      cy.contains('Post').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: user1.username, password: user1.password})
    })

    it('A blog can be created', function() {
      cy.get('#show-button').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#post-blog').click()
      cy.contains(blog.title)
      cy.contains(blog.author)
      cy.get('.success').contains('Blog posted')

      cy.get('#show-blog').click()
      cy.contains(blog.url)
      cy.contains('Likes: 0')
    })
  })

  describe('When your blog is shown', function() {
    beforeEach(function() {
      cy.login({username: user1.username, password: user1.password})
      cy.get('#show-button').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#post-blog').click()
      cy.get('#show-blog').click()
    })

    it('It can be liked', function() {
      cy.get('#like-blog').click()
      cy.contains('Likes: 1')
      cy.get('#like-blog').click()
      cy.contains('Likes: 2')
      cy.get('.success').contains('Blog liked')
    })

    it('It can be deleted', function() {
      cy.get('#delete-blog').click()
      cy.get('.success').contains('Blog removed')
      cy.contains(blog.title).should('not.exist')
      cy.contains(blog.author).should('not.exist')
    })
  })

  describe("When someone else's blog is shown", function() {
    beforeEach(function() {
      cy.login({username: user1.username, password: user1.password})
      cy.get('#show-button').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#post-blog').click()

      cy.login({username: user2.username, password: user2.password})
      cy.get('#show-blog').click()
    })

    it('It can be liked', function() {
      cy.get('#like-blog').click()
      cy.contains('Likes: 1')
      cy.get('#like-blog').click()
      cy.contains('Likes: 2')
      cy.get('.success').contains('Blog liked')
    })

    it('It cannot be deleted', function() {
      cy.get('#delete-blog').should('not.exist')
    })
  })

  describe('When many blogs are in db', function() {
    beforeEach(function() {
      cy.login({username: user1.username, password: user1.password})
      console.log(localStorage.getItem('loggedBlogappUser'))
      cy.post(worstBlog)
      cy.post(okayBlog)
      cy.post(bestBlog)

      cy.contains(bestBlog.title).find('#show-blog').click()
      cy.contains(okayBlog.title).find('#show-blog').click()

      cy.contains(okayBlog.title).find('#like-blog').click()
      cy.contains(bestBlog.title).find('#like-blog').click()
      cy.contains(bestBlog.title).find('#like-blog').click()
      cy.visit('http://localhost:3000')
      cy.contains(okayBlog.title).find('#show-blog').click()
      cy.contains(bestBlog.title).find('#show-blog').click()
      cy.contains(worstBlog.title).find('#show-blog').click()
    })

    it('They are in proper order', function() {
      cy.get('li').then( blogs => {
        console.log(blogs.length)
        cy.wrap(blogs[0]).contains('I am the best')
        cy.wrap(blogs[1]).contains('I am okay')
        cy.wrap(blogs[2]).contains('I am the worst')
      })
    })

    it('They are in proper order after shuffling', function() {
      cy.contains(okayBlog.title).find('#like-blog').click()
      cy.contains(okayBlog.title).find('#like-blog').click()
      cy.contains(okayBlog.title).find('#like-blog').click()
      cy.contains(worstBlog.title).find('#like-blog').click()
      cy.contains(worstBlog.title).find('#like-blog').click()
      cy.contains(worstBlog.title).find('#like-blog').click()
      cy.wait(100)
      cy.get('li').then( blogs => {
        console.log(blogs.length)
        cy.wrap(blogs[2]).contains('I am the best')
        cy.wrap(blogs[0]).contains('I am okay')
        cy.wrap(blogs[1]).contains('I am the worst')
      })
    })
  })
})