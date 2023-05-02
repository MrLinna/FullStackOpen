const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const config = require('./config')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')
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

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!

    authorCount: Int!
    allAuthors: [Author!]!
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
    addBook: async (root, { author: name, genres, published, title }) => {
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

    editAuthor: async (root, { name, setBornTo }) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: config.PORT
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
