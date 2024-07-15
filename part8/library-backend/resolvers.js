const { GraphQLError, NoDeprecatedCustomRule } = require('graphql');
const jwt = require('jsonwebtoken');
const Book = require('./mongo_models/book');
const Author = require('./mongo_models/author');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },

    bookCount: async () => {
      return await Book.collection.countDocuments();
    },

    allBooks: async (root, args) => {
      try {
        if (!args.author && !args.genre) {
          return await Book.find({}).populate('author');
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
        console.log('get here?');
        const books = await Book.find(query).populate('author');
        console.log('populated books: ', books);
        return books;
      } catch (error) {
        console.error('Error fetching books:', error);
        throw new GraphQLError(error);
      }
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
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
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
      console.log('user: ', context.currentUser);
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated');
      }

      // find or create the author
      let author;
      try {
        author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
      } catch (error) {
        console.log('Error finding or saving author:', error);
        throw new GraphQLError('Error finding or saving author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error,
          },
        });
      }

      // create and save the book
      let book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (error) {
        console.log('Error saving book:', error);
        throw new GraphQLError('Error saving book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        });
      }

      // populate the author field before returning
      try {
        book = await book.populate('author');
        console.log('populated', book);
      } catch (error) {
        console.log('Error populating author:', error);
        throw new GraphQLError('Error populating author', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error,
          },
        });
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated');
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
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') },
  },
};

module.exports = resolvers;
