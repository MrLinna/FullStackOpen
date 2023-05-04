const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const config = require('./config')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
require('dotenv').config()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!

  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!

    allBooks(author: String, genre: String): [Book!]!

    authorCount: Int!

    allAuthors: [Author!]!

    me: User

    recommendedForMe: [Book!]!

  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

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
        return book
      } catch (error) {
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
const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: config.PORT,
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'favoriteGenre'
      )
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
