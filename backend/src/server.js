const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const resolvers = require('./resolvers/auth');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

const getUser = (token) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, "your_secret_key");
      return decoded.userId;
    }
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, './schema/auth.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const userId = getUser(token.replace('Bearer ', ''));
    return { userId, prisma };
  },
});

server.listen({port: 4000}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
