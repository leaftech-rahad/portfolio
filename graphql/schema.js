const { makeExecutableSchema } = require("@graphql-tools/schema");

const { typeDefs } = require("./typeDefs.js");
const { context } = require("../prisma/context");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { User } = require("./resolvers/User.js");
const { Post } = require("./resolvers/Post.js");

const schema = makeExecutableSchema({
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
  },
  typeDefs,
  context: context,
});

module.exports = { schema };
