import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import { createServer } from "http";
import session from "express-session";
import Redis from "connect-redis";
import { createClient } from "redis";
import { schema } from "./src/graphql/schema.js";

let RedisStore = Redis(session);

(async () => {
  // Required logic for integrating with Express

  const app = express();

  app.disable("x-powered-by");

  //ENV variables

  const { NODE_ENV, APP_PORT, SESS_NAME, SESS_SECRET, SESS_LIFETIME } =
    process.env;

  const IN_PROD = NODE_ENV === "production";

  //session

  let redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD,
      },
    })
  );

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = createServer(app);

  console.log(NODE_ENV);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({ req, res }),
    playground: IN_PROD
      ? false
      : {
          settings: {
            "request.credentials": "include",
          },
        },

    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
    cors: false,
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen(APP_PORT, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
  );
})();

//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
//
// const { ApolloServer } = require("apollo-server-express");
// const {
//   ApolloServerPluginDrainHttpServer,
//   ApolloServerPluginLandingPageLocalDefault,
// } = require("apollo-server-core");
// const express = require("express");
// const http = require("http");
// const { context } = require("./prisma/context");
// const { schema } = require("./graphql/schema");

// const app = express();
// const httpServer = http.createServer(app);

// const server = new ApolloServer({
//   schema: schema,
//   context: context,
//   csrfPrevention: true,
//   cache: "bounded",
//   plugins: [
//     ApolloServerPluginDrainHttpServer({ httpServer }),
//     ApolloServerPluginLandingPageLocalDefault({ embed: true }),
//   ],
// });

// const start = async () => {
//   await server.start();
//   await server.applyMiddleware({ app });
//   console.log(`hi`);
// };
// start();

// new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
