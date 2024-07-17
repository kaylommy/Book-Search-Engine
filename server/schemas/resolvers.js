const { Query } = require('../../../fitsync-pro/server/schemas/resolvers');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if  (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new Error('You must be logged in!');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {

        },
        addUser: async (parent, { username, email, password }) => {

        },
        saveBook: async (parent, book, context) => {

        },
        removeBook: async (parent, { bookId }, context) => {

        }
    }
}