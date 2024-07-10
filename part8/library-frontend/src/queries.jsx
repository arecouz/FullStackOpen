import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query Query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query ALLBooks {
    allBooks {
      title
      published
      genres
      id
      author {
        name
        born
        bookCount
      }
    }
  }
`;

export const ALL_BOOKS_GENRE = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $genres: [String!]!
    $published: Int
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
      author {
        name
      }
    }
  }
`;

export const EDIT_BIRTH_YEAR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
