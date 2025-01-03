const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClientKnownRequestError } = require('@prisma/client');

const resolvers = {
  Query: {
    me: async (_, __, { userId, prisma }) => {
      if (!userId) throw new Error("Not authenticated");
      return prisma.user.findUnique({ where: { id: userId } });
    },
  },
  Mutation: {
    register: async (_, { username, email, password }, { prisma }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
        const token = jwt.sign({ userId: user.id }, "your_secret_key");
    
        return { token, user };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
          const field = error.meta.target; // Get the field causing the unique constraint error
          throw new Error(`An account with this ${field} already exists.`);
        }        
    
        // Re-throw other errors
        throw new Error('An error occurred during registration.');
      }
    },
    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("No user found");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");
      const token = jwt.sign({ userId: user.id }, "your_secret_key");
      return { token, user };
    },
  },
};

module.exports = resolvers;
