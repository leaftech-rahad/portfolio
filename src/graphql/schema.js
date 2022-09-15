import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs } from "./typeDefs.js";

import { Query } from "./resolvers/Query.js";
import { Mutation } from "./resolvers/Mutation.js";
import { User } from "./resolvers/User.js";
import { Post } from "./resolvers/Post.js";

import AuthDirective from "../directives/auth.js";
import GuestDirective from "../directives/guest.js";

let schema = makeExecutableSchema({
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
  },
  typeDefs,
});
const directiveTransformers = [
  AuthDirective("auth").authDirectiveTransformer,
  GuestDirective("guest").guestDirectiveTransformer,
];
schema = directiveTransformers.reduce(
  (curSchema, transformer) => transformer(curSchema),
  schema
);

export { schema };
