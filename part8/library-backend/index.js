require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid'); // generates ID
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken'); // for authorization
const Author = require('./mongo_models/author');
const Book = require('./mongo_models/book');
const User = require('./mongo_models/user');
console.log('book: ', Book);
console.log('author: ', Author);

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongo'))
  .catch((error) => console.log(error.message));

const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
    
  type User {
    username: String!
    favoriteGenre: String
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
  }

  
  type Mutation {

    addBook(
        title: String!
        author: String!
        published: Int
        genres: [String!]!
    ) : Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }


`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },

    bookCount: async () => {
      return await Book.collection.countDocuments();
    },

    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({});
      }
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          console.log('Author not found');
          return [];
        }
        console.log('author', author);
        query.author = author._id;
      }
      if (args.genre) {
        query.genres = args.genre;
      }

      const books = await Book.find(query);
      return books;
    },

    authorCount: async () => {
      return await Author.collection.countDocuments();
    },

    allAuthors: async () => {
      return await Author.find({});
    },
  },

  Author: {
    bookCount: (author) => {
      return 99;
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError(error);
      }
      return user;
    },

    login: async (root, args) => {
      const users = await User.find({});
      console.log(users);
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== process.env.PASSWORD) {
        throw new GraphQLError('wrong credentials');
      }
      return {
        value: jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET
        ),
      };
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
      }
      try {
        await author.save();
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      let book = new Book({ ...args, author });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error);
      }
      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated')
      }
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true } // return the updated document
        );
        if (!updatedAuthor) {
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
            },
          });
        }
        return updatedAuthor;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    } else {
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// TODO =========================================
// - make it so add/edit requires authorization
