const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//using merge to combine multiple resolvers
const { merge } = require('lodash');
const authResolvers = require('./resolvers/auth');
const productResolvers = require('./resolvers/product');


const prisma = new PrismaClient();
const resolvers = merge(authResolvers, productResolvers);

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = loadFilesSync('./src/schema/**/*.graphql');
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    //const token = req.headers.authorization || '';
    const token = req.headers.authorization?.split(" ")[1];
    //const userId = getUser(token.replace('Bearer ', ''));
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, 'your_secret_key');
        userId = decoded.userId;
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }

    return { userId, prisma };
  },
});

server.listen({port: 4000}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
