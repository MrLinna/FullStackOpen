import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
      }
      published
      title
      genres
    }
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
      username
    }
  }
`

export const RECOMMENDED_FOR_ME = gql`
  query {
    recommendedForMe {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    author {
      name
    }
    title
    published
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`
