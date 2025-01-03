const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const productResolvers = require('./resolvers/product');
const authResolvers = require('./resolvers/auth');
const fs = require('fs');
const path = require('path');


const prisma = new PrismaClient();

//Load schema
const productSchema = fs.readFileSync(path.join(__dirname, './schema/product.graphql'), 'utf8');
const authSchema = fs.readFileSync(path.join(__dirname, './schema/auth.graphql'), 'utf8');
 

const typeDefs = [productSchema, authSchema];
const resolvers = [productResolvers, authResolvers]

const server = new ApolloServer({
    typeDefs,
    resolvers,
  context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        let userId = null;


        if(token){
           try{
               const decodedToken = jwt.verify(token, 'your_secret_key');
               userId = decodedToken.userId;
             } catch (error){
               console.error("JWT Verification Error: ", error)
            }
        }

        return { prisma, userId };
      },
  });
  
  server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
  });