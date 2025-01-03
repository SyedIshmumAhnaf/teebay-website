const { ApolloError } = require('apollo-server');

const resolvers = {
    Query: {
      products: async (_, { skip = 0, take = 10 }, { prisma }) => {
        return await prisma.product.findMany({skip,take});
      },
      product: async (_, { id }, { prisma }) => {
        return await prisma.product.findUnique({
          where: { id: parseInt(id) },
        });
      },
    },
    Mutation: {
      createProduct: async (_, { name, description, price, category }, { prisma, userId }) => {
        if (!userId) throw new Error("Not authenticated");

        const existingProduct = await prisma.product.findFirst({
            where: {
              name,
              userId,
              category,
            },
        });
          
        if (existingProduct) {
            throw new ApolloError(
                "A product with the same name and category already exists for this user.",
                "BAD_USER_INPUT",
                {
                  field: "name",
                  conflictCategory: "category",
                }
              );
              
        }
          
  
        return await prisma.product.create({
          data: {
            name,
            description,
            price,
            category,
            userId,
          },
        });
      },
      updateProduct: async (_, { id, name, description, price, category }, { prisma, userId }) => {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  
        if (!product) throw new Error("Product not found");
        if (product.userId !== userId) throw new Error("Not authorized");
  
        return await prisma.product.update({
          where: { id: parseInt(id) },
          data: { name, description, price, category },
        });
      },
      deleteProduct: async (_, { id }, { prisma, userId }) => {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  
        if (!product) throw new Error("Product not found");
        if (product.userId !== userId) throw new Error("Not authorized");
  
        await prisma.product.delete({ where: { id: parseInt(id) } });
  
        return "Product deleted successfully";
      },
    },
  };
  
  module.exports = resolvers;
  