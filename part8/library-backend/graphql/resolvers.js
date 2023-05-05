const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),

    allBooks: async (_root, { author, genre }) => {
      let filter = {}
      if (author) {
        filter.author = await Author.findOne({ name: author })
      }
      if (genre) {
        filter.genres = genre
      }
      return Book.find(filter)
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    recommendedForMe: async (root, args, context) => {
      try {
        const genre = context.currentUser.favoriteGenre
        const allBooks = await Book.find({})
        const booksToReturn = allBooks.filter(
          (book) => book.genres.indexOf(genre) > -1
        )
        return booksToReturn
      } catch (error) {
        return []
      }
    }
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent })
  },
  Book: {
    author: async (parent) => {
      await parent.populate('author')
      return parent.author
    }
  },

  Mutation: {
    addBook: async (
      root,
      { author: name, genres, published, title },
      context
    ) => {
      checkAuthorization(context)

      try {
        let author = await Author.findOne({ name })
        if (!author) {
          author = new Author({ name })
          await author.save()
        }
        const book = new Book({ author, genres, published, title })
        await book.save()
        console.log('book mutatiossa', book)
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        console.log('')
        console.log('mutation epäonnistui')
        console.log('')
        throw new GraphQLError(error.message)
      }
    },

    editAuthor: async (root, { name, setBornTo }, context) => {
      checkAuthorization(context)
      const author = await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      )
      if (author === null) {
        throw new GraphQLError(`Author '${name}' does not exist`)
      } else {
        return author
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const checkAuthorization = (context) => {
  const currentUser = context.currentUser
  if (!currentUser) {
    throw new GraphQLError('not authenticated', {
      extensions: {
        code: 'BAD_USER_INPUT'
      }
    })
  }
}
module.exports = resolvers
