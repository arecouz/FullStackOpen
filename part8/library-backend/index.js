const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid'); // generates ID
const { GraphQLError } = require('graphql');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: '2008',
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: '2002',
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: '2018',
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: '2008',
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: '2012',
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: '1866',
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: '1872',
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];
const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
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
        author: String!
        published: String
        genres: [String!]!
    ) : Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
  }


`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filteredBooks = books;
      if (args.author) {
        filteredBooks = books.filter((book) => book.author === args.author);
      }
      if (args.genre) {
        filteredBooks = books.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return filteredBooks;
    },
    authorCount: () => authors.length,
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (author) => {
      return books.filter((book) => book.author === author.name).length;
    },
  },

  Mutation: {
    addBook: (root, args) => {
      // Duplicate name? throw an error.
      if (books.find((b) => b.title === args.title)) {
        console.log('duplicate name');
        throw new GraphQLError('Title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        });
      }
      // New author? add them.
      if (!authors.find((a) => a.name === args.author)) {
        const author = { name: args.author, bookCount: 1, id: uuid() };
        console.log(author);
        authors = authors.concat(author);
      }
      // Else, just add the book
      const book = { ...args, id: uuid() };
      books = books.concat(book);

      return book;
    },
    editAuthor: (root, args) => {
      const index = authors.findIndex((a) => a.name === args.name);
      if (index === -1) {
        throw new GraphQLError('author name not found.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      const updatedAuthor = { ...authors[index], born: args.setBornTo };
      authors[index] = updatedAuthor;
      // update authors
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
