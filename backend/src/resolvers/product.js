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
      categories: async (_, __, { prisma }) => {
        return await prisma.category.findMany();
      },
    },
    Mutation: {
      createProduct: async (_, { name, description, price, categoryIds }, { prisma, userId }) => {
        if (!userId) throw new ApolloError("Not authenticated", "UNAUTHENTICATED");

        const parsedCategoryIds = categoryIds.map((id) => parseInt(id, 10));

        const existingCategories = await prisma.category.findMany({
          where: {
            id: {
              in: parsedCategoryIds
            }
          }
        });

        if(existingCategories.length !== parsedCategoryIds.length){
          throw new ApolloError("Not all categories were found in the database", "BAD_USER_INPUT");
        }

        const existingProduct = await prisma.product.findFirst({
          where: {
            name,
            userId,
            categories: {
              some: {
                id: {
                  in: parsedCategoryIds,
                },
              },
            },
          },
        });        
          
        if (existingProduct) {
            throw new ApolloError(
                "A product with the same name and category already exists for this user.",
                "BAD_USER_INPUT",
                {
                  field: "name",
                  conflictCategory: "categories",
                }
              );
              
        }
  
        return await prisma.product.create({
          data: {
            name,
            description,
            price,
            user: {
                connect: { id: userId },
            },
            categories: {
              connect: parsedCategoryIds.map((id) => ({ id})),
            },
          },
          include: { categories: true },
        });
      },
      updateProduct: async (_, { id, name, description, price, categoryIds }, { prisma, userId }) => {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  
        if (!product) throw new ApolloError("Product not found", "NOT_FOUND");
        if (product.userId !== userId) throw new ApolloError("Not authorized", "UNAUTHORIZED");

        const parsedCategoryIds = categoryIds.map((id) => parseInt(id, 10));
         const existingCategories = await prisma.category.findMany({
          where: {
            id: {
              in: parsedCategoryIds
            }
          }
        });
          
        if(existingCategories.length !== parsedCategoryIds.length){
              throw new ApolloError("Not all categories were found in the database", "BAD_USER_INPUT");
          }
        
        return await prisma.product.update({
          where: { id: parseInt(id) },
          data: { 
            name, description, price, 
            categories: {
              set: parsedCategoryIds.map((id) => ({ id: parseInt(id) })),
            }, 
          },
          include: { categories: true },
        });
      },
      deleteProduct: async (_, { id }, { prisma, userId }) => {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  
        if (!product) throw new ApolloError("Product not found", "NOT_FOUND");
        if (product.userId !== userId) throw new ApolloError("Not authorized", "UNAUTHORIZED");
  
        await prisma.product.delete({ where: { id: parseInt(id) } });
  
        return "Product deleted successfully";
      },
    },
  };
  
  module.exports = resolvers;
  