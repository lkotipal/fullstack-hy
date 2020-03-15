import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_NAMES = gql`
  query {
    allAuthors  {
      id
      name
    }
  }
`

export const ALL_BIRTHYEARS = gql`
  query {
    allAuthors  {
      id
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String)  {
    allBooks(
      author: $author
      genre: $genre
    ) {
      title
      id
      author {
        name
        id
      }
      published
    }
  }
`

export const MY_FAVORITE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      id
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

export const BOOK_ADDED = gql`  
  subscription {    
    bookAdded {      
      title
      id
      author {
        name
        id
      }
      published
    }  
  }  
`